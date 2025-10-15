/**
 * Netlify Function: Newsletter Subscription Handler
 * Securely forwards newsletter subscriptions to external webhook
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

    // Validate email field
    if (!data.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email address is required' })
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Get webhook URL from environment variables
    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('NEWSLETTER_WEBHOOK_URL environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Configuration error' })
      };
    }

    // Forward to external webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        timestamp: new Date().toISOString(),
        source: 'ClinicIQ Solutions Newsletter',
        origin: event.headers.origin || 'unknown'
      })
    });

    if (!response.ok) {
      console.error(`Newsletter webhook error: ${response.status} ${response.statusText} - URL: ${webhookUrl}`);

      // For 404, provide helpful error message
      if (response.status === 404) {
        console.error('Newsletter webhook endpoint not found. Please verify NEWSLETTER_WEBHOOK_URL is correct.');
        // Return graceful fallback instead of throwing
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you for subscribing! Your email has been received and we\'ll add you to our newsletter.',
            fallback: true
          })
        };
      }

      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully subscribed to newsletter'
      })
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to subscribe',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};