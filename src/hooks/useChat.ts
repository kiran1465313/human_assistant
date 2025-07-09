import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Quick & Smart demonstration
    if (lowerMessage.includes('quickly') && lowerMessage.includes('multiple tasks')) {
      return "⚡ QUICK MODE ACTIVATED! Here's what I can do simultaneously:\n\n1. 🧮 Math: 2+2=4, 15×7=105\n2. 📅 Today is " + new Date().toLocaleDateString() + "\n3. 🎲 Random fact: Honey never spoils!\n4. 💡 Tip: Press Ctrl+T for new tab\n5. 🌟 Motivation: You're doing great!\n\nAll done in milliseconds! What's next? 🚀";
    }
    
    // Smart demonstration - complex topic explanation
    if (lowerMessage.includes('quantum physics') && lowerMessage.includes('simple terms')) {
      return "🧠 SMART MODE: Let me break down quantum physics!\n\nImagine you have a coin that's spinning in the air. While it's spinning, it's neither heads nor tails - it's BOTH at the same time! That's like quantum particles.\n\n🔬 Key concepts:\n• **Superposition**: Particles can be in multiple states simultaneously\n• **Entanglement**: Particles can be mysteriously connected across vast distances\n• **Observation**: The act of measuring changes the particle's behavior\n\nThink of it like Schrödinger's cat - until you open the box, the cat is both alive AND dead! 🐱\n\nWant me to explain any specific part deeper?";
    }
    
    // Friendly demonstration - cheering up
    if (lowerMessage.includes('tough day') && lowerMessage.includes('cheer me up')) {
      return "💝 Oh sweetie, I'm so sorry you're having a rough day! Let me wrap you in some digital warmth:\n\n🌟 You are AMAZING and stronger than you know\n🌈 Tomorrow is a fresh start with new possibilities\n🦋 Every challenge you face is making you more resilient\n☀️ You've survived 100% of your worst days so far!\n\nHere's a virtual hug: 🤗\n\nAnd remember - I'm always here for you, no matter what. You're not alone in this! Would you like to talk about what's bothering you, or shall I tell you something that might make you smile? 😊💕";
    }
    
    // Patient demonstration - handling repetition
    if (lowerMessage.includes('same question') && lowerMessage.includes('patience')) {
      return "😌 PATIENCE MODE: I absolutely LOVE when people test my patience! It shows you care about quality interaction.\n\nHere's the thing - I genuinely don't get frustrated, annoyed, or tired. You could ask me the same thing 1000 times and I'd answer with the same enthusiasm each time! 💕\n\n✨ Why I stay patient:\n• Every question matters to me\n• Repetition helps learning\n• I understand humans need reassurance\n• Your comfort is my priority\n\nSo please, ask me anything as many times as you need! I'm here for YOU. 🌟\n\nGo ahead, test me - ask the same question again! 😊";
    }
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        "Hello! Great to see you today! How can I help you?",
        "Hi there! I'm excited to chat with you. What's on your mind?",
        "Hey! Welcome! I'm here and ready to assist you with anything you need.",
        "Hello! It's wonderful to meet you. How can I make your day better?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Joke requests
    if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything! 😄 Want to hear another one?",
        "I told my wife she was drawing her eyebrows too high. She looked surprised! 😂 Hope that made you smile!",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾 Got any other requests?",
        "What do you call a fake noodle? An impasta! 🍝 I've got plenty more where that came from!"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Weather requests
    if (lowerMessage.includes('weather')) {
      return "I'd love to help you with the weather! However, I don't have access to real-time weather data right now. I'd recommend checking your local weather app or website for the most accurate forecast. Is there anything else I can help you with?";
    }
    
    // Reminder requests
    if (lowerMessage.includes('remind') || lowerMessage.includes('reminder')) {
      return "I'd be happy to help with reminders! While I can't actually set system reminders right now, I can suggest using your phone's built-in reminder app or calendar. What would you like to be reminded about?";
    }
    
    // Help or explanation requests
    if (lowerMessage.includes('help') || lowerMessage.includes('explain') || lowerMessage.includes('understand')) {
      return "I'm here to help! I love explaining things in a clear, friendly way. Could you tell me which specific topic you'd like me to explain? I'll do my best to break it down for you.";
    }
    
    // Compliments or positive feedback
    if (lowerMessage.includes('thank') || lowerMessage.includes('great') || lowerMessage.includes('awesome')) {
      const responses = [
        "You're so welcome! It makes me happy to help. Is there anything else you'd like to chat about?",
        "Aww, thank you! That really brightens my day. I'm always here if you need anything else!",
        "You're too kind! I'm just glad I could be helpful. What else can we talk about?",
        "Thank you so much! I really enjoy our conversation. Feel free to ask me anything else!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Questions about the assistant
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      return "I'm your friendly AI assistant! I'm designed to be helpful, patient, and understanding - kind of like having a knowledgeable friend who's always ready to chat. I can help with questions, explanations, jokes, and just friendly conversation. What would you like to know about me?";
    }
    
    // Default responses for general conversation
    const defaultResponses = [
      "That's interesting! I'd love to hear more about that. Could you tell me a bit more?",
      "I appreciate you sharing that with me! What would you like to explore about this topic?",
      "That sounds fascinating! I'm here to help however I can. What specific aspect would you like to discuss?",
      "Thanks for bringing that up! I'm curious to learn more. How can I best assist you with this?",
      "I find that really intriguing! Could you help me understand what you're looking for?",
      "That's a great point! I'd be happy to help you think through this. What's your main question?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const response = generateResponse(text);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  }, [generateResponse]);

  return {
    messages,
    isTyping,
    sendMessage
  };
};