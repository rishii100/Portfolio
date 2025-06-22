from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Gemini API configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyBazT33TzT5ctJlwZ0CRd812ZqVK8rr6x4')
GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

@app.route('/api/', methods=['GET'])
def hello_world():
    return jsonify({"message": "Portfolio Backend API is running!"})

@app.route('/api/gemini/generate', methods=['POST'])
def generate_content():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        system_prompt = data.get('systemPrompt', '')
        temperature = data.get('temperature', 0.7)
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        
        # Prepare request for Gemini API
        content_text = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
        
        gemini_request = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": content_text
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": temperature,
                "topK": 1,
                "topP": 1,
                "maxOutputTokens": 2048,
            }
        }
        
        # Make request to Gemini API
        headers = {
            'Content-Type': 'application/json',
        }
        
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers=headers,
            json=gemini_request,
            timeout=30
        )
        
        logger.info(f"Gemini API response status: {response.status_code}")
        
        if response.status_code != 200:
            logger.error(f"Gemini API error: {response.text}")
            return jsonify({"error": f"Gemini API error: {response.status_code}"}), 500
        
        result = response.json()
        
        if 'candidates' in result and len(result['candidates']) > 0:
            if 'content' in result['candidates'][0] and 'parts' in result['candidates'][0]['content']:
                generated_text = result['candidates'][0]['content']['parts'][0]['text']
                return jsonify({"response": generated_text})
        
        logger.error(f"Unexpected Gemini response format: {result}")
        return jsonify({"error": "Invalid response format from Gemini API"}), 500
        
    except requests.exceptions.Timeout:
        logger.error("Gemini API request timeout")
        return jsonify({"error": "Request timeout"}), 504
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return jsonify({"error": f"Request failed: {str(e)}"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/gemini/structured', methods=['POST'])
def generate_structured():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        system_prompt = data.get('systemPrompt', '')
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        
        # Prepare request for Gemini API
        content_text = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
        
        gemini_request = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": content_text
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topK": 1,
                "topP": 1,
                "maxOutputTokens": 2048,
            }
        }
        
        # Make request to Gemini API
        headers = {
            'Content-Type': 'application/json',
        }
        
        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers=headers,
            json=gemini_request,
            timeout=30
        )
        
        logger.info(f"Gemini API response status: {response.status_code}")
        
        if response.status_code != 200:
            logger.error(f"Gemini API error: {response.text}")
            return jsonify({"error": f"Gemini API error: {response.status_code}"}), 500
        
        result = response.json()
        
        if 'candidates' in result and len(result['candidates']) > 0:
            if 'content' in result['candidates'][0] and 'parts' in result['candidates'][0]['content']:
                response_text = result['candidates'][0]['content']['parts'][0]['text']
            else:
                return jsonify({"error": "Invalid response format from Gemini API"}), 500
        else:
            return jsonify({"error": "No candidates in Gemini API response"}), 500
        
        # Try to parse as JSON
        try:
            # Look for JSON in the response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start != -1 and json_end != 0:
                json_str = response_text[json_start:json_end]
                parsed_json = json.loads(json_str)
                return jsonify(parsed_json)
            else:
                # Try parsing the entire response
                parsed_json = json.loads(response_text)
                return jsonify(parsed_json)
                
        except json.JSONDecodeError:
            logger.warning(f"Could not parse JSON from response: {response_text}")
            # Return a default structure with the raw response
            return jsonify({
                "error": "Failed to parse response",
                "raw": response_text,
                "persona": "general",
                "intent": "explore_projects",
                "confidence": 0.5
            })
            
    except Exception as e:
        logger.error(f"Structured generation error: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "gemini_api_configured": bool(GEMINI_API_KEY),
        "endpoints": [
            "/api/",
            "/api/gemini/generate",
            "/api/gemini/structured",
            "/api/health"
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)
