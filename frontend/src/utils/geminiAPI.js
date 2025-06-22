// Gemini API utilities for all AI agents (Frontend-only with better error handling)
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export class GeminiAPI {
  static async generateContent(prompt, systemPrompt = "", temperature = 0.7) {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured');
      }

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: temperature,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API Error Response:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Return a helpful fallback response instead of throwing
      if (error.message.includes('CORS')) {
        return "I'm experiencing some technical difficulties with AI processing right now. Please try again in a moment.";
      }
      
      return "I'm currently unable to process your request. Please try refreshing the page or try again later.";
    }
  }

  static async generateStructuredResponse(prompt, systemPrompt = "") {
    try {
      const response = await this.generateContent(prompt, systemPrompt, 0.3);
      
      // If it's already an error message, return default structure
      if (response.includes('technical difficulties') || response.includes('unable to process')) {
        return {
          persona: 'general',
          intent: 'explore_projects',
          confidence: 0.5,
          recommended_section: 'about',
          personalization: 'General exploration of the portfolio'
        };
      }
      
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      try {
        return JSON.parse(response);
      } catch (parseError) {
        console.warn('Failed to parse JSON response:', response);
        // Return a default structure with helpful info
        return {
          persona: 'general',
          intent: 'explore_projects',
          confidence: 0.5,
          recommended_section: 'about',
          personalization: 'General exploration of the portfolio',
          error: 'Response parsing failed',
          raw: response
        };
      }
    } catch (error) {
      console.error('Failed to generate structured response:', error);
      // Return a safe default structure
      return {
        persona: 'general',
        intent: 'explore_projects',
        confidence: 0.5,
        recommended_section: 'about',
        personalization: 'General exploration of the portfolio'
      };
    }
  }
}