// Gemini API utilities for all AI agents
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export class GeminiAPI {
  static async generateContent(prompt, systemPrompt = "", temperature = 0.7) {
    try {
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
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  static async generateStructuredResponse(prompt, systemPrompt = "") {
    const response = await this.generateContent(prompt, systemPrompt, 0.3);
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse structured response:', error);
      // Return a default structure if parsing fails
      return { error: 'Failed to parse response', raw: response };
    }
  }
}