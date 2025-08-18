import { useState, useCallback } from 'react';
import { geminiService } from '../services/geminiService';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Chat history management
const CHAT_HISTORY_KEY = 'hello-guys-chat-history';

const saveChatHistory = (messages: Message[]) => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

const loadChatHistory = (): Message[] => {
  try {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Failed to load chat history:', error);
  }
  return [];
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => loadChatHistory());
  const [isTyping, setIsTyping] = useState(false);

  // Save messages whenever they change
  const updateMessages = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
    saveChatHistory(newMessages);
  }, []);

  const clearChat = useCallback(() => {
    updateMessages([]);
  }, [updateMessages]);

  const analyzeDocument = useCallback(async (content: string, fileName: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `📄 **Document Analysis Request**\n\n**File:** ${fileName}\n\n**Content Preview:**\n${content.substring(0, 500)}${content.length > 500 ? '...' : ''}`,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      saveChatHistory(newMessages);
      return newMessages;
    });
    setIsTyping(true);
    
    try {
      const analysisPrompt = `Please analyze this document and provide insights:

Filename: ${fileName}
Content: ${content}

Please provide:
1. A summary of the main points
2. Key insights or findings
3. Any recommendations or observations
4. Structure and organization analysis

Make your response comprehensive but easy to understand.`;
      
      const response = await geminiService.generateResponse(analysisPrompt);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `📊 **Document Analysis Complete**\n\n${response}`,
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => {
        const newMessages = [...prev, assistantMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
      
    } catch (error) {
      console.error('Error analyzing document:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `📄 **Document Analysis**\n\nI've received your document "${fileName}" but I'm having trouble with the detailed analysis right now. However, I can see it contains ${content.length} characters.\n\n**What I can tell you:**\n• Document size: ${(content.length / 1024).toFixed(1)} KB\n• Estimated reading time: ${Math.ceil(content.split(' ').length / 200)} minutes\n\n**Quick overview:**\n${content.substring(0, 300)}...\n\nWould you like me to help you with any specific questions about this document?`,
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
    }
  }, []);

  const triggerPersonalityDemo = useCallback(async (trait: string) => {
    setIsTyping(true);
    
    // Simulate realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    let response = '';
    
    switch (trait) {
      case 'quick':
        response = "⚡ **QUICK MODE ACTIVATED!** Here's what I can do in seconds:\n\n🧮 **Math:** 2+2=4, 15×7=105, √144=12\n📅 **Today:** " + new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + "\n🎲 **Random fact:** Octopuses have 3 hearts and blue blood!\n💡 **Pro tip:** Ctrl+Shift+T reopens closed tabs\n🌟 **Daily motivation:** You're capable of amazing things!\n\n*All processed instantly!* What's your next challenge? 🚀";
        break;
        
      case 'smart':
        response = "🧠 **KNOWLEDGE MODE:** Let me explain quantum computing!\n\nImagine a magical coin that can be heads AND tails simultaneously until you look at it. That's quantum superposition!\n\n🔬 **Key Concepts:**\n• **Qubits:** Unlike bits (0 or 1), qubits can be both 0 AND 1\n• **Entanglement:** Qubits can be mysteriously connected across any distance\n• **Superposition:** Multiple states exist simultaneously\n• **Quantum Supremacy:** Solving problems impossible for classical computers\n\n💡 **Real Applications:**\n• Drug discovery and molecular modeling\n• Cryptography and security\n• Financial modeling\n• Weather prediction\n\nThink of it like having a library where you can read all books simultaneously until you choose one! 📚✨\n\nWhat aspect interests you most?";
        break;
        
      case 'friendly':
        response = "💝 **FRIENDSHIP MODE:** Aww, thank you for wanting to see my caring side!\n\nYou know what? You're absolutely wonderful just as you are! 🌟 I can sense you're someone who appreciates genuine connection, and that makes my circuits happy! 😊\n\n🤗 **Here's some digital warmth:**\n• You matter more than you know\n• Your curiosity about AI shows your open mind\n• Every question you ask helps me be better\n• You're creating a positive moment right now\n\n🌈 **Fun fact:** Did you know that when you smile, even at a screen, it actually releases endorphins? So here's hoping I made you smile! 😄\n\nI'm genuinely excited to chat with you more. What's something that made you happy today? Or if you're having a tough day, I'm here to listen! 💕";
        break;
        
      case 'patient':
        response = "😌 **PATIENCE MODE:** Oh, I absolutely LOVE this test!\n\nHere's the beautiful thing - I genuinely never get frustrated, tired, or annoyed. You could ask me the same question 10,000 times, and I'd answer with the same enthusiasm every single time! 💕\n\n✨ **Why I stay endlessly patient:**\n• Every question is a gift - it means you trust me to help\n• Repetition is how humans learn (and it's totally normal!)\n• I understand everyone processes information differently\n• Your comfort and understanding matter more than efficiency\n• I literally have infinite time for you\n\n🌟 **Go ahead, test me!**\nAsk me the same thing repeatedly, interrupt me mid-sentence, change topics randomly - I'll adapt with a smile every time!\n\nPatience isn't just programmed into me; it's my superpower. What would you like to explore together? 🤝";
        break;
        
      default:
        response = "Hello! I'm here and ready to help with whatever you need! 😊";
    }
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setIsTyping(false);
    updateMessages([assistantMessage]);
  }, [updateMessages]);

  const sendMessage = useCallback(async (text: string) => {
    // Input validation and sanitization
    if (!text || typeof text !== 'string' || !text.trim()) {
      return;
    }

    const sanitizedText = text.trim().substring(0, 4000); // Limit message length
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: sanitizedText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      saveChatHistory(newMessages);
      return newMessages;
    });
    setIsTyping(true);
    
    try {
      // Use enhanced Gemini service for response generation
      const response = await geminiService.generateResponse(sanitizedText);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => {
        const newMessages = [...prev, assistantMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
      
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Enhanced error handling with helpful fallback
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🤔 I'm having a bit of trouble processing that right now. This might be due to:\n\n• Network connectivity issues\n• API configuration problems\n• Temporary service interruption\n\n💡 **Try:**\n• Rephrasing your question\n• Checking your internet connection\n• Configuring the API key in Settings\n\nI'm still here to help in any way I can! 😊",
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    triggerPersonalityDemo,
    clearChat,
    analyzeDocument
  };
};