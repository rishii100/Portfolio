// PersonaRouterAgent - Classifies user intent and persona
import { GeminiAPI } from '../utils/geminiAPI';

export class PersonaRouterAgent {
  static async classifyUser(userInput) {
    const systemPrompt = `You are a PersonaRouterAgent for Aneerban Saha's portfolio website. 
    Your job is to analyze user input and classify their persona and intent to provide personalized navigation.
    
    Based on the user input, return a JSON response with:
    {
      "persona": "one of: recruiter, developer, mentor, student, researcher, collaborator, general",
      "intent": "one of: explore_projects, view_skills, check_experience, see_awards, get_contact, download_resume, learn_about_ai, ask_questions, get_critique",
      "confidence": "number between 0-1",
      "recommended_section": "specific section to highlight",
      "personalization": "brief description of how to customize the experience"
    }
    
    Consider these personas:
    - recruiter: Looking for hiring, wants to see experience, skills, projects
    - developer: Interested in technical details, code, projects
    - mentor: Looking to guide or assess capabilities
    - student: Learning, seeking inspiration or help
    - researcher: Interested in publications, research work
    - collaborator: Wants to work together on projects
    - general: Casual visitor or unclear intent`;

    const prompt = `User Input: "${userInput}"
    
    Please analyze this input and return the classification JSON.`;

    try {
      const response = await GeminiAPI.generateStructuredResponse(prompt, systemPrompt);
      return response;
    } catch (error) {
      console.error('PersonaRouterAgent Error:', error);
      return {
        persona: 'general',
        intent: 'explore_projects',
        confidence: 0.5,
        recommended_section: 'about',
        personalization: 'General exploration of the portfolio'
      };
    }
  }

  static getPersonalizedGreeting(classification) {
    const greetings = {
      recruiter: `Hello! I see you're interested in evaluating talent. Let me highlight Aneerban's professional experience and key achievements that make him a strong candidate.`,
      developer: `Hey there, fellow developer! You'll probably be most interested in Aneerban's technical projects and the code behind his AI/ML implementations.`,
      mentor: `Greetings! As someone in a mentoring role, you might want to see Aneerban's learning journey, achievements, and areas where he's grown.`,
      student: `Hi! Great to meet a fellow learner. Aneerban's projects and learning path might inspire your own journey in AI/ML and development.`,
      researcher: `Hello, researcher! You'll be interested in Aneerban's publications and research contributions in AI, particularly his work on text summarization.`,
      collaborator: `Hey! Looking to collaborate? Let me show you Aneerban's projects and skills so you can see how you might work together.`,
      general: `Welcome to Aneerban's portfolio! Feel free to explore his work in AI/ML, web development, and various technical projects.`
    };
    
    return greetings[classification.persona] || greetings.general;
  }

  static getRecommendedActions(classification) {
    const actions = {
      recruiter: [
        { text: "View Experience", section: "experience" },
        { text: "Check Skills", section: "skills" },
        { text: "Download Resume", action: "download_resume" },
        { text: "See Awards", section: "awards" }
      ],
      developer: [
        { text: "Explore Projects", section: "projects" },
        { text: "View Skills", section: "skills" },
        { text: "GitHub Profile", action: "external_link", url: "https://github.com/rishii100" },
        { text: "Technical Experience", section: "experience" }
      ],
      mentor: [
        { text: "Learning Journey", section: "education" },
        { text: "Achievements", section: "awards" },
        { text: "Project Growth", section: "projects" },
        { text: "Contact", section: "contact" }
      ],
      student: [
        { text: "Inspiring Projects", section: "projects" },
        { text: "Learning Path", section: "education" },
        { text: "Skills Developed", section: "skills" },
        { text: "Competitions Won", section: "awards" }
      ],
      researcher: [
        { text: "Publications", section: "publications" },
        { text: "Research Projects", section: "projects" },
        { text: "Academic Awards", section: "awards" },
        { text: "Collaborate", section: "contact" }
      ],
      collaborator: [
        { text: "Project Portfolio", section: "projects" },
        { text: "Technical Skills", section: "skills" },
        { text: "Get In Touch", section: "contact" },
        { text: "Social Links", section: "contact" }
      ],
      general: [
        { text: "About Aneerban", section: "about" },
        { text: "View Projects", section: "projects" },
        { text: "Skills & Experience", section: "skills" },
        { text: "Contact", section: "contact" }
      ]
    };
    
    return actions[classification.persona] || actions.general;
  }
}