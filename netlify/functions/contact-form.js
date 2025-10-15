/**
 * Netlify Function: Contact Form Handler
 * Securely forwards contact form submissions to external webhook
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

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get webhook URL from environment variables
    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('CONTACT_FORM_WEBHOOK_URL environment variable not set');
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
        ...data,
        timestamp: new Date().toISOString(),
        source: 'ClinicIQ Solutions Contact Form',
        origin: event.headers.origin || 'unknown'
      })
    });

    if (!response.ok) {
      console.error(`Contact form webhook error: ${response.status} ${response.statusText} - URL: ${webhookUrl}`);

      // For 404, provide helpful error message
      if (response.status === 404) {
        console.error('Contact form webhook endpoint not found. Please verify CONTACT_FORM_WEBHOOK_URL is correct.');
        // Return graceful fallback instead of throwing
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Thank you for your message! We\'ll get back to you soon at the email you provided.',
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
        message: 'Message sent successfully'
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send message',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};