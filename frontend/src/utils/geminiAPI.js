// Gemini API utilities for all AI agents via backend
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export class GeminiAPI {
  static async generateContent(prompt, systemPrompt = "", temperature = 0.7) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/gemini/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          systemPrompt: systemPrompt,
          temperature: temperature
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Backend API error: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Backend API Error:', error);
      throw error;
    }
  }

  static async generateStructuredResponse(prompt, systemPrompt = "") {
    try {
      const response = await fetch(`${BACKEND_URL}/api/gemini/structured`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          systemPrompt: systemPrompt
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Backend API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backend Structured API Error:', error);
      // Return a default structure if API fails
      return {
        error: 'Failed to parse response',
        raw: error.message,
        persona: 'general',
        intent: 'explore_projects',
        confidence: 0.5,
        recommended_section: 'about',
        personalization: 'General exploration of the portfolio'
      };
    }
  }
}