/**
 * Netlify Function: Chatbot Handler
 * Securely forwards chat messages to external webhook
 */

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);

    // Validate message field
    if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Get webhook URL from environment variables
    const webhookUrl = process.env.CHATBOT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('CHATBOT_WEBHOOK_URL environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Configuration error' })
      };
    }

    // Forward to external webhook with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          message: data.message.trim(),
          timestamp: new Date().toISOString(),
          user_id: data.user_id || 'anonymous',
          source: 'ClinicIQ Solutions Chat',
          type: 'chat_message',
          origin: event.headers.origin || 'unknown'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }

      // Try to parse response
      let botMessage = '';

      try {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const responseData = await response.json();

          // Handle array response format: [{"output": "message"}]
          if (Array.isArray(responseData) && responseData.length > 0 && responseData[0]?.output) {
            botMessage = responseData[0].output;
          }
          // Handle other common formats
          else {
            botMessage = responseData.response ||
                        responseData.message ||
                        responseData.reply ||
                        responseData.text ||
                        responseData.output ||
                        responseData.data?.response ||
                        responseData.body?.response ||
                        responseData.body?.message ||
                        (Array.isArray(responseData) && responseData[0]?.response) ||
                        (Array.isArray(responseData) && responseData[0]?.message) ||
                        '';
          }
        } else {
          // Handle text response
          botMessage = await response.text();
        }
      } catch (parseError) {
        console.warn('Response parsing error:', parseError);
        botMessage = '';
      }

      // Return the bot response or a fallback message
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: botMessage || "I'm here to help! How can I assist you with ClinicIQ Solutions today?",
          timestamp: new Date().toISOString()
        })
      };

    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }

      throw fetchError;
    }

  } catch (error) {
    console.error('Chatbot error:', error);

    // Return fallback response for better user experience
    const fallbackMessage = "I'm having trouble connecting right now. Please try again later or contact us directly at hello@cliniciqsolutions.com";

    return {
      statusCode: 200, // Return 200 to provide fallback response to user
      headers,
      body: JSON.stringify({
        success: true,
        message: fallbackMessage,
        timestamp: new Date().toISOString(),
        fallback: true
      })
    };
  }
};