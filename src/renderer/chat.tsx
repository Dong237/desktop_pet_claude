import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { useAppStore } from './store';

const ChatWindow: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    chatMessages,
    isTyping,
    error,
    hasApiKey,
    userProfile,
    loadUserProfile,
    loadChatHistory,
    sendMessage,
    clearChat,
    checkApiKeyStatus,
  } = useAppStore();

  const chatTheme = userProfile?.settings?.chatTheme || 'minimal';

  useEffect(() => {
    loadUserProfile();
    loadChatHistory();
    checkApiKeyStatus();

    // Listen for settings changes from other windows
    const intervalId = setInterval(() => {
      loadUserProfile();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!hasApiKey) {
      alert('Please set up your Qwen API key in Settings first!');
      return;
    }

    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case 'budget':
        await sendMessage('Show me my budget status');
        break;
      case 'market':
        await sendMessage('What\'s the market doing today?');
        break;
      case 'expense':
        setInputMessage('I spent ');
        break;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-full theme-${chatTheme} chat-bg transition-colors duration-300`}>
      {/* Header */}
      <div className={`px-4 py-3 border-b ${
        chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
          ? 'bg-white/80 backdrop-blur-md border-gray-200'
          : 'bg-[#252525] border-white/10'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦊</span>
            <div>
              <h1 className={`text-lg font-semibold ${
                chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                  ? 'text-gray-900'
                  : 'text-white'
              }`}>Zhang Qiang</h1>
              <p className={`text-xs ${
                chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                  ? 'text-gray-500'
                  : 'text-gray-400'
              }`}>Financial Waste Advisor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {chatMessages.length > 0 && (
              <button
                onClick={clearChat}
                title="New Conversation"
                className={`p-2 rounded-lg transition-all hover:scale-105 ${
                  chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                    ? 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    : 'hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </button>
            )}
            {!hasApiKey && (
              <button
                onClick={() => window.electronAPI.openSettingsWindow()}
                className="text-xs text-orange-500 hover:text-orange-400 underline"
              >
                Setup API Key
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {chatMessages.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full text-center ${
            chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
              ? 'text-gray-600'
              : 'text-gray-400'
          }`}>
            <span className="text-6xl mb-4">🦊</span>
            <p className="text-lg font-medium">What financial disaster are we</p>
            <p className="text-lg font-medium">discussing today?</p>
            <p className="text-sm mt-4 opacity-70">
              Try: "Help me budget" or "I spent 50 yuan on lunch"
            </p>
          </div>
        ) : (
          <>
            {chatMessages.map((msg, index) => {
              const isConsecutive =
                index > 0 &&
                chatMessages[index - 1].role === msg.role;

              return (
                <div
                  key={msg.messageId}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${
                    isConsecutive ? 'mt-1' : 'mt-3'
                  }`}
                >
                  <div
                    className={`${
                      msg.role === 'user' ? 'message-user' : 'message-assistant'
                    } animate-fade-in`}
                  >
                    <div className={`text-sm whitespace-pre-wrap leading-relaxed ${
                      chatTheme === 'gradient' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'minimal' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'apple' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'whatsapp' ? 'text-gray-900' :
                      chatTheme === 'gradient' && msg.role === 'assistant' ? 'text-gray-900' :
                      chatTheme === 'minimal' && msg.role === 'assistant' ? 'text-gray-900' :
                      chatTheme === 'apple' && msg.role === 'assistant' ? 'text-gray-900' :
                      ''
                    }`}>{msg.content}</div>
                    {msg.metadata?.expenseLogged && (
                      <div className="mt-2 text-xs text-green-500 flex items-center gap-1 font-medium">
                        <span>✓</span>
                        <span>Expense logged</span>
                      </div>
                    )}
                    <div className={`text-xs mt-1.5 opacity-60 ${
                      chatTheme === 'gradient' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'minimal' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'apple' && msg.role === 'user' ? 'text-white' :
                      chatTheme === 'whatsapp' ? 'text-gray-700' :
                      chatTheme === 'gradient' && msg.role === 'assistant' ? 'text-gray-700' :
                      chatTheme === 'minimal' && msg.role === 'assistant' ? 'text-gray-700' :
                      chatTheme === 'apple' && msg.role === 'assistant' ? 'text-gray-700' :
                      'text-gray-500'
                    }`}>
                      {formatTimestamp(msg.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start mt-3">
                <div className="message-assistant animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow"></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-500 rounded-full animate-pulse-slow"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                    <span className={`text-sm ${
                      chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    }`}>Zhang Qiang is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mb-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className={`px-4 py-2 border-t ${
        chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
          ? 'bg-white/80 backdrop-blur-md border-gray-200'
          : 'bg-[#252525] border-white/10'
      }`}>
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickAction('budget')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs transition-colors font-medium ${
              chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            💰 Budget
          </button>
          <button
            onClick={() => handleQuickAction('market')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs transition-colors font-medium ${
              chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            📈 Market
          </button>
          <button
            onClick={() => handleQuickAction('expense')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs transition-colors font-medium ${
              chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            💸 Log Expense
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className={`px-4 py-3 border-t ${
        chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
          ? 'bg-white/90 backdrop-blur-md border-gray-200'
          : 'bg-[#252525] border-white/10'
      }`}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none transition-all ${
              chatTheme === 'minimal' || chatTheme === 'apple' || chatTheme === 'whatsapp'
                ? 'bg-gray-100 border-2 border-transparent text-gray-900 placeholder-gray-500 focus:border-blue-500'
                : 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
            }`}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`w-10 h-10 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              chatTheme === 'minimal' || chatTheme === 'apple'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : chatTheme === 'whatsapp'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<ChatWindow />);
