// RAG-Based Assistant for portfolio Q&A
import { GeminiAPI } from '../utils/geminiAPI';
import { VectorSearch } from '../utils/vectorSearch';

export class RAGAssistant {
  static async answerQuestion(question) {
    try {
      // Step 1: Retrieve relevant chunks using hybrid search
      const relevantChunks = VectorSearch.hybridSearch(question, 4);
      
      if (relevantChunks.length === 0) {
        return "I don't have specific information about that. Could you ask about Aneerban's skills, experience, projects, or achievements?";
      }

      // Step 2: Build context from relevant chunks
      const context = relevantChunks
        .map(chunk => `[${chunk.category.toUpperCase()}] ${chunk.content}`)
        .join('\n\n');

      // Step 3: Create prompt for Gemini
      const systemPrompt = `You are an AI assistant representing Aneerban Saha's portfolio. 
      Answer questions about Aneerban based on the provided context. 
      
      Guidelines:
      - Be conversational and friendly
      - Use specific examples from the context
      - If asked about skills, mention specific technologies and projects
      - If asked about experience, reference specific companies and achievements
      - If asked about projects, explain the technical details and impact
      - If the context doesn't contain the answer, politely redirect to available information
      - Always speak in first person as if you are Aneerban
      - Keep responses concise but informative`;

      const prompt = `Question: ${question}

Context about Aneerban Saha:
${context}

Please answer the question based on the context provided.`;

      // Step 4: Get response from Gemini
      const response = await GeminiAPI.generateContent(prompt, systemPrompt, 0.7);
      
      return response;

    } catch (error) {
      console.error('RAGAssistant Error:', error);
      return "I'm sorry, I'm having trouble processing your question right now. Please try again or ask about my projects, skills, or experience.";
    }
  }

  static async getSuggestedQuestions() {
    return [
      "What are your main technical skills?",
      "Tell me about your AI/ML projects",
      "What awards have you won?",
      "Describe your work experience",
      "What's your educational background?",
      "What kind of research have you published?",
      "How did you improve loan recovery at Grameen Shakti?",
      "Tell me about your hackathon achievements",
      "What technologies do you use for web development?",
      "How accurate are your ML models?"
    ];
  }

  static getQuickAnswers() {
    return {
      "skills": "I'm skilled in AI/ML, web development, blockchain, and have experience with Python, JavaScript, Docker, AWS, and various ML frameworks.",
      "projects": "My key projects include MediAlert (AI-powered medical event detection), Hope (disaster response chatbot with RAG), and SyncSkills (AI-powered resume evaluation).",
      "experience": "I've worked as an AI intern at MyLead Fintech, ML intern at Bharat Intern, and at Grameen Shakti Microfinance where I improved loan recovery by 40%.",
      "education": "I'm pursuing B.Tech in CSE with AI/ML specialization at Manipal University Jaipur with a CGPA of 8.06.",
      "awards": "I've won multiple hackathons including HACKS 8.0 (1st position), received Dean's Academic Excellence Award, and achieved 3rd position in research presentation."
    };
  }
}