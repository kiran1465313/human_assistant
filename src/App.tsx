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

function App() {
  const { messages, isTyping, sendMessage } = useChat();
  const { currentScreen, navigateTo, goBack, goHome, canGoBack } = useNavigation();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Navigation Header */}
      <NavigationHeader
        currentScreen={currentScreen}
        canGoBack={canGoBack}
        onBack={goBack}
        onHome={goHome}
        onNavigate={navigateTo}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onStartChat={handleStartChat} onNavigate={navigateTo} />
        )}
        
        {currentScreen === 'chat' && (
          <>
            {!hasMessages ? (
              <WelcomeScreen onStartChat={handleStartChat} onNavigate={navigateTo} />
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
            <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
          </>
        )}
        
        {currentScreen === 'settings' && <SettingsScreen />}
        
        {currentScreen === 'about' && <AboutScreen />}
      </main>
    </div>
  );
}
            </div>
          </div>
        )}
      </main>

      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
}

export default App;