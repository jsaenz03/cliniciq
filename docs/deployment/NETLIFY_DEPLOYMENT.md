# Netlify Deployment Guide

This guide explains how to deploy the ClinicIQ Solutions website to Netlify with secure webhook handling using environment variables.

## Overview

The website uses Netlify Functions to securely handle webhook URLs, keeping sensitive endpoints hidden from public view. The functions act as secure proxies between your website and external webhook services.

## Required Environment Variables

You need to set these environment variables in your Netlify dashboard:

### Contact Form Webhook
- **Variable Name**: `CONTACT_FORM_WEBHOOK_URL`
- **Description**: URL for contact form submissions
- **Example**: `https://your-webhook-service.com/contact`

### Newsletter Subscription Webhook
- **Variable Name**: `NEWSLETTER_WEBHOOK_URL`
- **Description**: URL for newsletter subscriptions
- **Example**: `https://your-webhook-service.com/newsletter`

### Chatbot Webhook
- **Variable Name**: `CHATBOT_WEBHOOK_URL`
- **Description**: URL for chatbot messages
- **Example**: `https://your-webhook-service.com/chat`

## Deployment Steps

### 1. Connect Your Repository

1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command**: (leave empty - static site)
   - **Publish directory**: `.` (current directory)
   - **Functions directory**: `netlify/functions`

### 2. Set Environment Variables

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** > **Environment variables**
3. Click **Add a variable** for each required variable:

```
Variable name: CONTACT_FORM_WEBHOOK_URL
Value: your-actual-contact-webhook-url

Variable name: NEWSLETTER_WEBHOOK_URL
Value: your-actual-newsletter-webhook-url

Variable name: CHATBOT_WEBHOOK_URL
Value: your-actual-chatbot-webhook-url
```

### 3. Deploy Your Site

1. Click **Deploy site** or push changes to your connected branch
2. Netlify will automatically build and deploy your site
3. Your functions will be available at:
   - `https://your-site.netlify.app/.netlify/functions/contact-form`
   - `https://your-site.netlify.app/.netlify/functions/newsletter`
   - `https://your-site.netlify.app/.netlify/functions/chatbot`

## Security Features

### Environment Variable Protection
- Webhook URLs are stored securely in Netlify's environment
- URLs are never exposed in client-side code
- Each function validates requests and sanitizes data

### CORS Configuration
- Functions include proper CORS headers
- Supports OPTIONS preflight requests
- Restricts to necessary HTTP methods

### Request Validation
- All functions validate required fields
- Email validation for newsletter subscriptions
- Input sanitization for security

### Error Handling
- Graceful fallbacks when webhooks are unavailable
- Detailed error logging for debugging
- User-friendly error messages

## Function Endpoints

### Contact Form Function
- **Endpoint**: `/.netlify/functions/contact-form`
- **Method**: POST
- **Required Fields**: `name`, `email`, `message`
- **Optional Fields**: `phone`

### Newsletter Function
- **Endpoint**: `/.netlify/functions/newsletter`
- **Method**: POST
- **Required Fields**: `email`

### Chatbot Function
- **Endpoint**: `/.netlify/functions/chatbot`
- **Method**: POST
- **Required Fields**: `message`
- **Optional Fields**: `user_id`

## Testing Your Deployment

### 1. Test Contact Form
1. Fill out the contact form on your deployed site
2. Check your webhook service for the submission
3. Verify you receive the expected data

### 2. Test Newsletter
1. Subscribe to the newsletter
2. Check your webhook service for the subscription
3. Verify email validation works

### 3. Test Chatbot
1. Open the chat widget
2. Send a test message
3. Verify the response from your webhook service

## Troubleshooting

### Common Issues

**Function not found (404)**
- Check that `functions = "netlify/functions"` is in netlify.toml
- Verify function files are in the correct directory
- Ensure function files have `.js` extension

**Environment variables not working**
- Check variable names match exactly (case-sensitive)
- Verify variables are set in the correct environment context
- Check for typos in variable names

**CORS errors**
- Verify your webhook service accepts the request origin
- Check that your webhook service returns proper CORS headers
- Ensure your webhook service handles OPTIONS requests

**Webhook timeouts**
- Functions have a 30-second timeout
- Ensure your webhook service responds quickly
- Check webhook service logs for errors

### Debug Mode

To enable debug logging in development:

1. Add `NODE_ENV = "development"` to your environment variables
2. Check the Netlify Functions logs for detailed error messages

## Environment-Specific Configuration

### Production
- Use your production webhook URLs
- Set appropriate rate limiting
- Enable error monitoring

### Staging/Preview
- Use staging webhook URLs for testing
- Enable detailed logging
- Test all functionality before promoting to production

## Security Best Practices

1. **Never commit webhook URLs** to your repository
2. **Use different webhooks** for staging and production
3. **Regularly rotate** webhook URLs if compromised
4. **Monitor function logs** for suspicious activity
5. **Implement rate limiting** if receiving high traffic

## Support

For issues with:
- **Netlify deployment**: [Netlify Support](https://netlify.com/support)
- **Function errors**: Check Netlify Functions logs
- **Webhook issues**: Contact your webhook service provider

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Environment Variables Guide](https://docs.netlify.com/environment-variables/)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)