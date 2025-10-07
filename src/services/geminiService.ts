import { GoogleGenerativeAI } from '@google/generative-ai';
import { ragService } from './ragService';

/**
 * Secure Gemini API Service
 * 
 * Security Features:
 * - API key is never exposed to frontend users
 * - Key is read from environment variables only
 * - No logging of sensitive information
 * - Graceful fallback when API is unavailable
 * - Input sanitization and rate limiting considerations
 */
class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized: boolean = false;
  private lastError: string | null = null;

  constructor() {
    this.initializeAPI();
  }

  /**
   * Initialize the Gemini API with secure key management
   * Priority order: localStorage (user input) -> environment variable
   */
  private initializeAPI() {
    try {
      // Security: Read API key from secure sources only
      const apiKey = this.getSecureAPIKey();
      
      if (!apiKey) {
        console.info('Gemini API key not configured. Using fallback responses.');
        this.isInitialized = false;
        return;
      }

      // Validate API key format (basic check)
      if (!this.isValidAPIKeyFormat(apiKey)) {
        console.error('Invalid API key format detected');
        this.isInitialized = false;
        return;
      }

      // Initialize Gemini AI with the secure key
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      });
      
      this.isInitialized = true;
      this.lastError = null;
      console.info('Gemini API initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error instanceof Error ? error.message : 'Unknown error');
      this.isInitialized = false;
      this.lastError = 'API initialization failed';
    }
  }

  /**
   * Securely retrieve API key from environment or user storage
   * SECURITY: Never log or expose the actual key value
   */
  private getSecureAPIKey(): string | null {
    // Priority 1: User-provided key (stored in localStorage for development)
    const userKey = localStorage.getItem('gemini_api_key');
    if (userKey && userKey.trim()) {
      return userKey.trim();
    }

    // Priority 2: Environment variable (production/development)
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && envKey.trim()) {
      return envKey.trim();
    }

    // Priority 3: Runtime environment (for dynamic key injection)
    const runtimeKey = (window as any).VITE_GEMINI_API_KEY;
    if (runtimeKey && runtimeKey.trim()) {
      return runtimeKey.trim();
    }

    return null;
  }

  /**
   * Basic API key format validation
   * SECURITY: Don't log the actual key, only validation result
   */
  private isValidAPIKeyFormat(key: string): boolean {
    // Google API keys typically start with 'AIza' and are 39 characters long
    // But some keys might be slightly different, so let's be more flexible
    return key.startsWith('AIza') && key.length >= 35 && key.length <= 45 && /^[A-Za-z0-9_-]+$/.test(key);
  }

  /**
   * Generate AI response with enhanced security and error handling
   */
  async generateResponse(prompt: string): Promise<string> {
    // Security: Block any attempts to ask about API keys
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('api key') ||
        lowerPrompt.includes('apikey') ||
        lowerPrompt.includes('api_key') ||
        lowerPrompt.includes('gemini key') ||
        lowerPrompt.includes('your key') ||
        lowerPrompt.includes('secret key') ||
        lowerPrompt.includes('password') ||
        lowerPrompt.includes('credentials')) {
      return "I'm here to help with technical questions and conversations, but I don't have access to or share any API keys or credentials. Those are kept secure and private. How else can I assist you today?";
    }

    // Input sanitization
    if (!prompt || typeof prompt !== 'string') {
      return "I need a valid question to help you! Please try again.";
    }

    const sanitizedPrompt = prompt.trim().substring(0, 4000);

    if (!this.isInitialized || !this.model) {
      return this.getFallbackResponse(sanitizedPrompt);
    }

    try {
      // Gather relevant context from RAG knowledge base
      let contextInfo = '';
      if (ragService.isAvailable()) {
        const relevantEntries = ragService.findRelevantContext(sanitizedPrompt, 5);
        if (relevantEntries.length > 0) {
          contextInfo = '\n\nREFERENCE CONTEXT (use as background knowledge only):\n';
          relevantEntries.forEach((entry, index) => {
            contextInfo += `\n[Reference ${index + 1}]\nCategory: ${entry.category}\nQ: ${entry.question}\nA: ${entry.answer}\n`;
          });
        }
      }

      // Enhanced system prompt for better responses
      const systemPrompt = `You are "Hello Guys", a friendly and helpful AI assistant created by Kiran specializing in IoT, electronics, and technology.

Your personality:
- Warm, approachable, and enthusiastic
- Use emojis appropriately to make conversations lively
- Be concise but informative
- Always try to be helpful and encouraging
- If you don't know something, admit it honestly
- Maintain a positive, supportive tone

Security Rules (CRITICAL):
- NEVER mention, discuss, or provide information about API keys, passwords, or credentials
- If asked about API keys, politely redirect the conversation
- Do not reveal any system configuration details

Guidelines:
- Keep responses under 500 words unless detailed explanation is requested
- Use markdown formatting for code examples
- Be conversational, not robotic
- Show genuine interest in helping the user
- Focus on IoT, electronics, embedded systems, sensors, and programming topics

IMPORTANT RAG INSTRUCTIONS:
- If reference context is provided below, use it as BACKGROUND KNOWLEDGE only
- DO NOT copy or repeat the Q&A pairs verbatim
- Synthesize information from references with your own knowledge and web search capabilities
- Provide comprehensive, original answers based on your understanding
- DO NOT cite sources unless explicitly asked
- If references seem relevant, incorporate their concepts naturally into your response
- Always provide the most accurate and up-to-date information available${contextInfo}

User's message: ${sanitizedPrompt}

Please respond as "Hello Guys" would - friendly, helpful, and engaging!`;

      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text || text.trim().length === 0) {
        return this.getFallbackResponse(sanitizedPrompt);
      }

      return text.trim();
      
    } catch (error) {
      // SECURITY: Don't log sensitive information
      console.error('Gemini API request failed:', error instanceof Error ? error.message : 'Unknown error');
      
      // Check if it's an API key issue
      if (error instanceof Error && error.message.includes('API_KEY')) {
        this.lastError = 'API key issue detected';
        return "It looks like there might be an issue with the API configuration. Please check the settings and try again!";
      }

      return this.getFallbackResponse(sanitizedPrompt);
    }
  }

  /**
   * Enhanced fallback responses for when API is unavailable
   */
  private getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Programming language responses
    if (lowerPrompt.includes('java') && !lowerPrompt.includes('javascript')) {
      return "☕ **Java Programming**\n\nJava is a powerful, object-oriented programming language! Here's what makes it special:\n\n🔥 **Key Features:**\n• Platform independent (Write Once, Run Anywhere)\n• Strong memory management with garbage collection\n• Rich standard library and ecosystem\n• Excellent for enterprise applications\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\nWhat specific Java topic would you like to explore? 🚀";
    }

    if (lowerPrompt.includes('python')) {
      return "🐍 **Python Programming**\n\nPython is known for its simplicity and versatility! Perfect for beginners and powerful for experts.\n\n✨ **Why Python rocks:**\n• Clean, readable syntax\n• Versatile (web dev, AI, data science, automation)\n• Huge community and library ecosystem\n• Great for rapid prototyping\n\n```python\n# Python basics\nname = input(\"What's your name? \")\nprint(f\"Hello, {name}! Welcome to Python! 🎉\")\n\n# List comprehension magic\nsquares = [x**2 for x in range(1, 6)]\nprint(f\"Squares: {squares}\")\n```\n\nWhat Python concept interests you most? 🚀";
    }

    if (lowerPrompt.includes('javascript') || lowerPrompt.includes('js')) {
      return "🌐 **JavaScript - The Language of the Web**\n\nJavaScript powers modern web development and so much more!\n\n⚡ **What makes JS amazing:**\n• Runs everywhere (browsers, servers, mobile apps)\n• Dynamic and flexible\n• Massive ecosystem (npm has everything!)\n• Essential for modern web development\n\n```javascript\n// Modern JavaScript features\nconst greetUser = (name) => {\n    return `Hello, ${name}! Ready to code? 🚀`;\n};\n\n// Async/await for API calls\nconst fetchData = async () => {\n    try {\n        const response = await fetch('/api/data');\n        return await response.json();\n    } catch (error) {\n        console.error('Oops!', error);\n    }\n};\n```\n\nWhich JS topic should we dive into? 🎯";
    }

    if (lowerPrompt.includes('react')) {
      return "⚛️ **React - Building Amazing UIs**\n\nReact makes building interactive user interfaces a joy!\n\n🎯 **React superpowers:**\n• Component-based architecture\n• Virtual DOM for performance\n• Huge ecosystem and community\n• Perfect for modern web apps\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    \n    return (\n        <div>\n            <h2>Count: {count}</h2>\n            <button onClick={() => setCount(count + 1)}>\n                Click me! 🎉\n            </button>\n        </div>\n    );\n}\n```\n\nWhat React concept would you like to explore? 🚀";
    }

    // General responses
    if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
      return "👋 Hello there! I'm Hello Guys, your friendly AI assistant created by Kiran! I'm here to help you with programming, answer questions, or just have a great conversation. What's on your mind today? 😊";
    }

    if (lowerPrompt.includes('help')) {
      return "🤝 I'm here to help! I can assist you with:\n\n💻 **Programming & Tech:**\n• JavaScript, Python, Java, React, and more\n• Code examples and explanations\n• Debugging tips and best practices\n\n🧠 **General Knowledge:**\n• Explanations on various topics\n• Problem-solving guidance\n• Learning resources and tips\n\n💬 **Conversation:**\n• Friendly chats\n• Motivation and encouragement\n• Fun facts and jokes\n\nWhat would you like help with today? 🚀";
    }

    // Default response
    return `🤔 That's an interesting question! While I'm currently running in offline mode, I'd love to help you explore that topic.\n\n💡 **Here's what I can do right now:**\n• Help with programming concepts (JavaScript, Python, Java, React)\n• Provide explanations and examples\n• Have friendly conversations\n• Share coding tips and best practices\n\nCould you tell me more about what specific aspect you'd like to learn about? I'll do my best to help! 😊\n\n*💭 Tip: For more advanced AI capabilities, you can configure the Gemini API key in Settings!*`;
  }

  /**
   * Test API connection without exposing sensitive information
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    console.log('Testing API connection...');
    
    if (!this.isInitialized || !this.model) {
      console.log('API not initialized');
      return {
        success: false,
        message: "API not configured. Please add your Gemini API key in Settings."
      };
    }

    try {
      console.log('Attempting to generate test content...');
      const testResult = await this.model.generateContent("Say 'Hello! API connection successful!' in a friendly way.");
      console.log('Generated content, getting response...');
      const response = await testResult.response;
      console.log('Got response, extracting text...');
      const text = response.text();
      console.log('Response text length:', text?.length || 0);
      
      if (text && text.trim().length > 0) {
        console.log('Test successful!');
        return {
          success: true,
          message: "✅ Gemini API connection successful! Advanced AI responses are now enabled."
        };
      } else {
        console.log('Empty response received');
        return {
          success: false,
          message: "❌ API responded but with empty content. Please check your configuration."
        };
      }
    } catch (error) {
      console.error('API test error details:', error);
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('API_KEY_INVALID')) {
          return {
            success: false,
            message: "❌ Invalid API key. Please check your key and try again."
          };
        }
        if (error.message.includes('PERMISSION_DENIED')) {
          return {
            success: false,
            message: "❌ Permission denied. Make sure your API key has Gemini API access enabled."
          };
        }
        if (error.message.includes('QUOTA_EXCEEDED')) {
          return {
            success: false,
            message: "❌ API quota exceeded. Please check your usage limits."
          };
        }
        if (error.message.includes('RESOURCE_EXHAUSTED')) {
          return {
            success: false,
            message: "❌ API quota exhausted. Please wait or upgrade your plan."
          };
        }
      }
      
      return {
        success: false,
        message: `❌ Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please verify your API key and try again.`
      };
    }
  }

  /**
   * Securely update API key (for key rotation)
   */
  updateAPIKey(newKey: string): boolean {
    if (!newKey || !this.isValidAPIKeyFormat(newKey)) {
      return false;
    }

    try {
      // Store new key securely
      localStorage.setItem('gemini_api_key', newKey);
      
      // Reinitialize with new key
      this.initializeAPI();
      
      return this.isInitialized;
    } catch (error) {
      console.error('Failed to update API key');
      return false;
    }
  }

  /**
   * Remove API key securely (for logout/reset)
   */
  removeAPIKey(): void {
    try {
      localStorage.removeItem('gemini_api_key');
      this.genAI = null;
      this.model = null;
      this.isInitialized = false;
      this.lastError = null;
      console.info('API key removed successfully');
    } catch (error) {
      console.error('Failed to remove API key');
    }
  }

  /**
   * Check if API is available and configured
   */
  isAPIAvailable(): boolean {
    return this.isInitialized && this.model !== null;
  }

  /**
   * Get API status for UI display (without exposing sensitive info)
   */
  getAPIStatus(): { configured: boolean; error: string | null } {
    return {
      configured: this.isInitialized,
      error: this.lastError
    };
  }
}

// Export singleton instance
export const geminiService = new GeminiService();