// PersonaRouter Component - AI-powered user classification
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { PersonaRouterAgent } from '../agents/PersonaRouterAgent';

export const PersonaRouter = () => {
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { personaClassification, isLoading, handlePersonaInput } = usePortfolioStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const classification = await handlePersonaInput(input);
    if (classification) {
      // Auto-hide after successful classification
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  const examplePrompts = [
    "I'm a recruiter looking for AI talent",
    "I'm a developer interested in your projects",
    "I want to collaborate on ML projects",
    "I'm a student learning about AI",
    "Show me your research work"
  ];

  if (!isVisible && personaClassification) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  AI Navigation Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  What brings you here today?
                </p>
              </div>
            </div>

            {!personaClassification ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g., I'm a recruiter looking for AI talent..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Quick examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {examplePrompts.slice(0, 3).map((prompt, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setInput(prompt)}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400 capitalize">
                    {personaClassification.persona} detected
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    {Math.round(personaClassification.confidence * 100)}% confidence
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {PersonaRouterAgent.getPersonalizedGreeting(personaClassification)}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Recommended actions:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PersonaRouterAgent.getRecommendedActions(personaClassification)
                      .slice(0, 4).map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (action.section) {
                            usePortfolioStore.getState().scrollToSection(action.section);
                          } else if (action.url) {
                            window.open(action.url, '_blank');
                          }
                        }}
                        className="text-xs px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};