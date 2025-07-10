import React, { useRef, useEffect } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AboutScreen } from './components/AboutScreen';
import { useChat } from './hooks/useChat';
import { useNavigation } from './hooks/useNavigation';
import { useVoiceChat } from './hooks/useVoiceChat';
import { useTheme } from './hooks/useTheme';
import { ThemeObjects } from './components/ThemeObjects';

function App() {
  const { messages, isTyping, sendMessage, triggerPersonalityDemo } = useChat();
  const { currentScreen, navigateTo, goBack, goHome, canGoBack } = useNavigation();
  const voiceChat = useVoiceChat();
  const theme = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const hasMessages = messages.length > 0;
  
  const handleStartChat = (message: string) => {
    navigateTo('chat');
    sendMessage(message);
  };

  const handlePersonalityDemo = (trait: string) => {
    navigateTo('chat');
    triggerPersonalityDemo(trait);
  };

  // Enhanced voice response logic
  useEffect(() => {
    if (voiceChat.settings.autoSpeak && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser && !isTyping) {
        voiceChat.speak(lastMessage.text);
      }
    }
  }, [messages, isTyping, voiceChat.settings.autoSpeak]);

  // Handle voice input responses
  const handleVoiceMessage = (message: string) => {
    sendMessage(message);
    // If voice input was used, automatically speak the response
    if (voiceChat.settings.enabled) {
      // Set a flag to speak the next AI response
      voiceChat.updateSettings({ autoSpeak: true });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 relative ${
      theme.theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50' :
      theme.theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' :
      theme.theme === 'pastel-cute' ? 'pastel-cute' :
      theme.theme === 'sci-fi-pet' ? 'sci-fi-pet' :
      theme.theme === 'nature-spirit' ? 'nature-spirit' :
      'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Animated Theme Objects */}
      <ThemeObjects />
      
      {/* Navigation Header */}
      <NavigationHeader
        currentScreen={currentScreen}
        canGoBack={canGoBack}
        onBack={goBack}
        onHome={goHome}
        onNavigate={navigateTo}
        voiceChat={voiceChat}
        theme={theme}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 pt-20">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onStartChat={handleStartChat} 
            onNavigate={navigateTo} 
            onPersonalityDemo={handlePersonalityDemo}
            voiceChat={voiceChat}
            theme={theme}
          />
        )}
        
        {currentScreen === 'chat' && (
          <>
            {!hasMessages ? (
              <WelcomeScreen 
                onStartChat={handleStartChat} 
                onNavigate={navigateTo} 
                onPersonalityDemo={handlePersonalityDemo}
                voiceChat={voiceChat}
                theme={theme}
              />
            ) : (
              <div className="flex-1 overflow-y-auto p-4 pt-6">
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                      onSpeak={voiceChat.settings.enabled ? voiceChat.speak : undefined}
                      isSpeaking={voiceChat.isSpeaking}
                      onStopSpeaking={voiceChat.stopSpeaking}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
            <ChatInput 
              onSendMessage={handleVoiceMessage} 
              disabled={isTyping} 
              voiceChat={voiceChat}
            />
          </>
        )}
        
        {currentScreen === 'settings' && (
          <div className="pt-6">
            <SettingsScreen voiceChat={voiceChat} theme={theme} />
          </div>
        )}
        
        {currentScreen === 'about' && (
          <div className="pt-6">
            <AboutScreen theme={theme} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;