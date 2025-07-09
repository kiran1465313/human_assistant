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

  // Auto-speak new assistant messages
  useEffect(() => {
    if (voiceChat.settings.autoSpeak && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser && !isTyping) {
        voiceChat.speak(lastMessage.text);
      }
    }
  }, [messages, isTyping, voiceChat.settings.autoSpeak]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex flex-col transition-colors duration-300">
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
      <main className="flex-1 flex flex-col">
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
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
            <ChatInput 
              onSendMessage={sendMessage} 
              disabled={isTyping} 
              voiceChat={voiceChat}
            />
          </>
        )}
        
        {currentScreen === 'settings' && <SettingsScreen voiceChat={voiceChat} theme={theme} />}
        
        {currentScreen === 'about' && <AboutScreen theme={theme} />}
      </main>
    </div>
  );
}

export default App;