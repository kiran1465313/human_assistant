import { useState, useCallback } from 'react';
import { geminiService } from '../services/geminiService';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const triggerPersonalityDemo = useCallback(async (trait: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    let response = '';
    
    switch (trait) {
      case 'quick':
        response = "⚡ QUICK MODE ACTIVATED! Here's what I can do simultaneously:\n\n1. 🧮 Math: 2+2=4, 15×7=105\n2. 📅 Today is " + new Date().toLocaleDateString() + "\n3. 🎲 Random fact: Honey never spoils!\n4. 💡 Tip: Press Ctrl+T for new tab\n5. 🌟 Motivation: You're doing great!\n\nAll done in milliseconds! What's next? 🚀";
        break;
      case 'smart':
        response = "🧠 SMART MODE: Let me break down quantum physics!\n\nImagine you have a coin that's spinning in the air. While it's spinning, it's neither heads nor tails - it's BOTH at the same time! That's like quantum particles.\n\n🔬 Key concepts:\n• **Superposition**: Particles can be in multiple states simultaneously\n• **Entanglement**: Particles can be mysteriously connected across vast distances\n• **Observation**: The act of measuring changes the particle's behavior\n\nThink of it like Schrödinger's cat - until you open the box, the cat is both alive AND dead! 🐱\n\nWant me to explain any specific part deeper?";
        break;
      case 'friendly':
        response = "💝 Oh sweetie, I'm so sorry you're having a rough day! Let me wrap you in some digital warmth:\n\n🌟 You are AMAZING and stronger than you know\n🌈 Tomorrow is a fresh start with new possibilities\n🦋 Every challenge you face is making you more resilient\n☀️ You've survived 100% of your worst days so far!\n\nHere's a virtual hug: 🤗\n\nAnd remember - I'm always here for you, no matter what. You're not alone in this! Would you like to talk about what's bothering you, or shall I tell you something that might make you smile? 😊💕";
        break;
      case 'patient':
        response = "😌 PATIENCE MODE: I absolutely LOVE when people test my patience! It shows you care about quality interaction.\n\nHere's the thing - I genuinely don't get frustrated, annoyed, or tired. You could ask me the same thing 1000 times and I'd answer with the same enthusiasm each time! 💕\n\n✨ Why I stay patient:\n• Every question matters to me\n• Repetition helps learning\n• I understand humans need reassurance\n• Your comfort is my priority\n\nSo please, ask me anything as many times as you need! I'm here for YOU. 🌟\n\nGo ahead, test me - ask the same question again! 😊";
        break;
      default:
        response = "I'm here to help! How can I assist you today?";
    }
    
    const assistantMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setIsTyping(false);
    setMessages([assistantMessage]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Use Gemini API for response generation
      const response = await geminiService.generateResponse(text);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fallback response in case of error
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment! 😊",
        isUser: false,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, fallbackMessage]);
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    triggerPersonalityDemo
  };
};