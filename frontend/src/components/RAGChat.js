// RAG Chat Component - Conversational AI assistant
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Sparkles, X, HelpCircle } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { RAGAssistant } from '../agents/RAGAssistant';

export const RAGChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  
  const { 
    chatMessages, 
    isAITyping, 
    askRAGQuestion, 
    addChatMessage,
    clearChatMessages 
  } = usePortfolioStore();

  useEffect(() => {
    // Load suggested questions on mount
    RAGAssistant.getSuggestedQuestions().then(setSuggestedQuestions);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAITyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const question = input.trim();
    setInput('');
    await askRAGQuestion(question);
  };

  const handleSuggestedQuestion = async (question) => {
    await askRAGQuestion(question);
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">$1</code>');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
        {chatMessages.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {Math.min(chatMessages.length, 9)}
          </span>
        )}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="relative w-full max-w-md h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg">
                    <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Portfolio Assistant
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ask me about Aneerban
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {chatMessages.length > 0 && (
                    <button
                      onClick={clearChatMessages}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      title="Clear chat"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hi! I'm an AI assistant that knows all about Aneerban's skills, projects, and experience. 
                        Ask me anything!
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Try asking:</p>
                      <div className="space-y-1">
                        {suggestedQuestions.slice(0, 4).map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="block w-full text-left text-xs p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'assistant' && (
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg">
                          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      } rounded-lg p-3`}>
                        <div 
                          className="text-sm"
                          dangerouslySetInnerHTML={{ 
                            __html: formatMessage(message.content) 
                          }}
                        />
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>

                      {message.type === 'user' && (
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}

                {/* Typing indicator */}
                {isAITyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about skills, projects, experience..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isAITyping}
                  />
                  <motion.button
                    type="submit"
                    disabled={isAITyping || !input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAITyping ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};