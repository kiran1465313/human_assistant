import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeAPI();
  }

  private initializeAPI() {
    // Check if API key is available
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 
                   localStorage.getItem('gemini_api_key') || 
                   (window as any).VITE_GEMINI_API_KEY;
    
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      } catch (error) {
        console.error('Failed to initialize Gemini API:', error);
      }
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    if (!this.model) {
      return this.getFallbackResponse(prompt);
    }

    try {
      // Enhanced prompt to make responses more conversational and helpful
      const enhancedPrompt = `You are "Hello Guys", a friendly AI assistant created by Kiran. 
      You should be helpful, conversational, and engaging. Use emojis appropriately to make responses more lively.
      Keep responses informative but not too lengthy unless specifically asked for detailed explanations.
      
      User question: ${prompt}
      
      Please respond in a warm, helpful manner as "Hello Guys" would.`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();
      
      return text || this.getFallbackResponse(prompt);
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackResponse(prompt);
    }
  }

  private getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Enhanced fallback responses for common queries
    if (lowerPrompt.includes('java') && !lowerPrompt.includes('javascript')) {
      return "☕ **Java Programming Language**\n\nJava is one of the most popular programming languages! It's platform-independent, object-oriented, and great for enterprise applications.\n\n🔥 **Key Features:**\n• Write once, run anywhere (WORA)\n• Strong memory management\n• Rich API and libraries\n• Excellent for large-scale applications\n\n📝 **Basic Syntax:**\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n```\n\nWould you like me to explain any specific Java concept in detail? 🚀";
    }

    if (lowerPrompt.includes('python')) {
      return "🐍 **Python Programming**\n\nPython is known for its simplicity and readability! Perfect for beginners and powerful for experts.\n\n✨ **Why Python?**\n• Easy to learn and read\n• Versatile (web, AI, data science)\n• Huge community and libraries\n• Great for rapid prototyping\n\n📝 **Quick Example:**\n```python\nname = \"Kiran\"\nprint(f\"Hello, {name}!\")\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nprint(squares)\n```\n\nWhat specific Python topic interests you? 🚀";
    }

    if (lowerPrompt.includes('javascript')) {
      return "🌐 **JavaScript - The Language of the Web**\n\nJavaScript powers the modern web and much more!\n\n⚡ **What makes JS special:**\n• Runs everywhere (browsers, servers, mobile)\n• Dynamic and flexible\n• Huge ecosystem (npm)\n• Essential for web development\n\n📝 **Modern JavaScript:**\n```javascript\n// ES6+ features\nconst greet = (name) => `Hello, ${name}!`;\n\n// Async/await\nconst fetchData = async () => {\n  const response = await fetch('/api/data');\n  return response.json();\n};\n```\n\nWant to dive deeper into any JS concept? 🚀";
    }

    // Default fallback
    return "I'd love to help you with that! While I'm working on connecting to more advanced AI capabilities, I can still assist with programming questions, explanations, and general conversation. Could you rephrase your question or let me know what specific aspect you'd like to explore? 😊";
  }

  isAPIAvailable(): boolean {
    return this.model !== null;
  }
}

export const geminiService = new GeminiService();