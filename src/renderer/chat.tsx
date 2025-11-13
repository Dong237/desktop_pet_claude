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
    loadUserProfile,
    loadChatHistory,
    sendMessage,
    checkApiKeyStatus,
  } = useAppStore();

  useEffect(() => {
    loadUserProfile();
    loadChatHistory();
    checkApiKeyStatus();
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
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#252525] border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦊</span>
            <div>
              <h1 className="text-lg font-semibold">Zhang Qiang</h1>
              <p className="text-xs text-gray-400">Financial Waste Advisor</p>
            </div>
          </div>
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <span className="text-6xl mb-4">🦊</span>
            <p className="text-lg">What financial disaster are we</p>
            <p className="text-lg">discussing today?</p>
            <p className="text-sm mt-4">
              Try: "Help me budget" or "I spent 50 yuan on lunch"
            </p>
          </div>
        ) : (
          <>
            {chatMessages.map((msg) => (
              <div
                key={msg.messageId}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : 'bg-white/5 border border-white/10'
                  } animate-fade-in`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  {msg.metadata?.expenseLogged && (
                    <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                      <span>✓</span>
                      <span>Expense logged</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-fade-in">
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
                    <span className="text-sm text-gray-400">Zhang Qiang is typing...</span>
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
      <div className="px-4 py-2 bg-[#252525] border-t border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickAction('budget')}
            className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors"
          >
            💰 Budget
          </button>
          <button
            onClick={() => handleQuickAction('market')}
            className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors"
          >
            📈 Market
          </button>
          <button
            onClick={() => handleQuickAction('expense')}
            className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors"
          >
            💸 Log Expense
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-[#252525] border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
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
