// Zustand store for portfolio state management
import { create } from 'zustand';

export const usePortfolioStore = create((set, get) => ({
  // UI State
  currentSection: 'hero',
  isLoading: false,
  isDarkMode: typeof window !== 'undefined' ? (localStorage.getItem('darkMode') !== 'false') : true,
  isMobileMenuOpen: false,
  
  // AI Agent States
  personaClassification: null,
  chatMessages: [],
  isAITyping: false,
  currentAgent: null, // 'persona', 'rag', 'critique'
  
  // Critique Tool State
  critiqueInput: '',
  critiqueType: 'general',
  critiqueResult: null,
  
  // Actions
  setCurrentSection: (section) => set({ currentSection: section }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode.toString());
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { isDarkMode: newDarkMode };
  }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  // AI Actions
  setPersonaClassification: (classification) => set({ personaClassification: classification }),
  
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...message
    }]
  })),
  
  clearChatMessages: () => set({ chatMessages: [] }),
  
  setIsAITyping: (typing) => set({ isAITyping: typing }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  
  // Critique Actions
  setCritiqueInput: (input) => set({ critiqueInput: input }),
  setCritiqueType: (type) => set({ critiqueType: type }),
  setCritiqueResult: (result) => set({ critiqueResult: result }),
  
  // Complex Actions
  scrollToSection: (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      set({ currentSection: sectionId });
    }
  },
  
  handlePersonaInput: async (input) => {
    set({ isLoading: true });
    try {
      const { PersonaRouterAgent } = await import('../agents/PersonaRouterAgent');
      const classification = await PersonaRouterAgent.classifyUser(input);
      set({ 
        personaClassification: classification,
        isLoading: false 
      });
      
      // Auto-scroll to recommended section
      if (classification.recommended_section) {
        setTimeout(() => {
          get().scrollToSection(classification.recommended_section);
        }, 1000);
      }
      
      return classification;
    } catch (error) {
      console.error('Error classifying user:', error);
      set({ isLoading: false });
      return null;
    }
  },
  
  askRAGQuestion: async (question) => {
    set({ isAITyping: true });
    
    // Add user message
    get().addChatMessage({
      type: 'user',
      content: question,
      agent: 'rag'
    });
    
    try {
      const { RAGAssistant } = await import('../agents/RAGAssistant');
      const answer = await RAGAssistant.answerQuestion(question);
      
      // Add AI response
      get().addChatMessage({
        type: 'assistant',
        content: answer,
        agent: 'rag'
      });
      
      set({ isAITyping: false });
      return answer;
    } catch (error) {
      console.error('Error getting RAG answer:', error);
      get().addChatMessage({
        type: 'assistant',
        content: "I'm sorry, I couldn't process your question right now. Please try again.",
        agent: 'rag',
        error: true
      });
      set({ isAITyping: false });
      return null;
    }
  },
  
  getCritique: async () => {
    const { critiqueInput, critiqueType } = get();
    if (!critiqueInput.trim()) return null;
    
    set({ isLoading: true });
    
    try {
      const { CritiqueAgent } = await import('../agents/CritiqueAgent');
      const result = await CritiqueAgent.critiqueText(critiqueInput, critiqueType);
      
      set({ 
        critiqueResult: result,
        isLoading: false 
      });
      
      return result;
    } catch (error) {
      console.error('Error getting critique:', error);
      set({ isLoading: false });
      return null;
    }
  }
}));
