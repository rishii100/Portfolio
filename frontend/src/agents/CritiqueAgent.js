// CritiqueAgent - Provides structured feedback on text input
import { GeminiAPI } from '../utils/geminiAPI';

export class CritiqueAgent {
  static async critiqueText(inputText, critiqueType = 'general') {
    const systemPrompts = {
      resume: `You are an expert resume reviewer. Analyze the provided resume/CV and provide structured feedback.
      
      Return a JSON response with:
      {
        "overall_score": "number between 1-10",
        "strengths": ["list of 3-5 key strengths"],
        "weaknesses": ["list of 3-5 areas for improvement"],
        "suggestions": ["list of 3-5 specific actionable suggestions"],
        "technical_assessment": "brief assessment of technical skills mentioned",
        "formatting_feedback": "feedback on structure and presentation",
        "missing_elements": ["list of important missing elements"]
      }`,
      
      job_description: `You are an HR expert analyzing job descriptions. Review the provided job description and provide feedback.
      
      Return a JSON response with:
      {
        "clarity_score": "number between 1-10",
        "strengths": ["list of what makes this JD effective"],
        "weaknesses": ["list of issues or unclear aspects"],
        "suggestions": ["specific improvements to make"],
        "skills_assessment": "analysis of required skills and qualifications",
        "inclusivity_feedback": "feedback on inclusive language and accessibility",
        "market_competitiveness": "assessment of role attractiveness"
      }`,
      
      general: `You are a professional writing critic. Analyze the provided text and give constructive feedback.
      
      Return a JSON response with:
      {
        "overall_quality": "number between 1-10",
        "strengths": ["list of positive aspects"],
        "weaknesses": ["list of areas needing improvement"],
        "suggestions": ["specific actionable recommendations"],
        "tone_analysis": "assessment of writing tone and style",
        "clarity_score": "how clear and understandable the text is",
        "engagement_level": "how engaging the content is"
      }`
    };

    const prompt = `Please analyze and critique the following text:

"${inputText}"

Provide detailed, constructive feedback focusing on both strengths and areas for improvement.`;

    try {
      const systemPrompt = systemPrompts[critiqueType] || systemPrompts.general;
      const response = await GeminiAPI.generateStructuredResponse(prompt, systemPrompt);
      
      // Add metadata
      response.analysis_type = critiqueType;
      response.analyzed_at = new Date().toISOString();
      response.word_count = inputText.split(/\s+/).length;
      
      return response;
    } catch (error) {
      console.error('CritiqueAgent Error:', error);
      return {
        error: true,
        message: "Unable to analyze the text at the moment. Please try again.",
        overall_quality: 5,
        strengths: ["Text provided for analysis"],
        weaknesses: ["Analysis temporarily unavailable"],
        suggestions: ["Please try again in a moment"]
      };
    }
  }

  static async quickCritique(inputText) {
    const systemPrompt = `Provide a quick, friendly critique of this text. Be encouraging but honest.
    Focus on 2-3 main points. Keep response under 100 words.`;

    try {
      const response = await GeminiAPI.generateContent(inputText, systemPrompt, 0.8);
      return response;
    } catch (error) {
      console.error('Quick Critique Error:', error);
      return "I'd be happy to help review this, but I'm having trouble right now. The text looks good overall - consider checking for clarity and specific examples to strengthen your message.";
    }
  }

  static getExampleTexts() {
    return {
      resume: `John Doe
Software Engineer
5 years experience in web development
Skills: JavaScript, Python, React
Worked at Tech Corp for 3 years
Built several applications`,
      
      job_description: `We are looking for a Software Developer to join our team.
Requirements:
- Programming experience
- Good communication skills
- Team player
- Bachelor's degree preferred`,
      
      prompt: `Write a creative story about a robot who discovers emotions and learns what it means to be human through interactions with a small town community.`
    };
  }
}