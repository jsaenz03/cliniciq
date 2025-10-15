# ClinicIQ Solutions Webhook Configuration

## Current Configuration ✅

Your Netlify environment variables are correctly set:

| Variable | URL | Status |
|----------|-----|--------|
| `CHATBOT_WEBHOOK_URL` | `https://dermalink.xyz/webhook-test/cliniciqchat` | ✅ Configured |
| `CONTACT_FORM_WEBHOOK_URL` | `https://dermalink.xyz/webhook-test/cliniciqemail` | ✅ Configured |
| `NEWSLETTER_WEBHOOK_URL` | `https://dermalink.xyz/webhook-test/cliniciqsubs` | ✅ Configured |

## Issue: 404 Webhook Error

**Error Message**: `Webhook responded with status: 404`

**Cause**: The dermalink.xyz webhook endpoints may not be responding correctly.

---

## Solution Options

### Option 1: Configure Existing Webhook Service (Recommended)

If you have a chatbot service (e.g., Dialogflow, OpenAI, custom API):

1. **Go to Netlify Dashboard**
   - Navigate to your site
   - Go to **Site settings** → **Environment variables**

2. **Set the Webhook URL**
   ```
   Variable: CHATBOT_WEBHOOK_URL
   Value: https://your-chatbot-service.com/api/chat
   ```

3. **Verify the endpoint exists**
   ```bash
   curl -X POST https://your-chatbot-service.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "test"}'
   ```

4. **Redeploy your site** or the environment variable will auto-apply

---

### Option 2: Use Make.com Webhook (Quick Setup)

1. **Create Make.com Scenario**
   - Go to [make.com](https://make.com)
   - Create new scenario with "Webhooks" → "Custom webhook"
   - Copy the generated webhook URL

2. **Add to Netlify**
   ```
   Variable: CHATBOT_WEBHOOK_URL
   Value: https://hook.us1.make.com/xxxxxxxxxxxxx
   ```

3. **Configure Make.com Response**
   - Add "Webhook Response" module
   - Set response format:
     ```json
     {
       "output": "Your bot response message here"
     }
     ```

---

### Option 3: Create Simple Mock Endpoint (Testing)

Use a temporary service like webhook.site for testing:

1. Go to [webhook.site](https://webhook.site)
2. Copy the unique URL
3. Add to Netlify environment variables
4. Test the chatbot (will accept messages but won't respond)

---

### Option 4: Disable Chatbot Temporarily

If you don't need the chatbot immediately:

**Remove the webhook URL from Netlify:**
- The function will return a friendly fallback message
- No errors will be thrown
- Users will see: "Thanks for your message! We'll get back to you soon..."

---

## Expected Webhook Request Format

Your webhook endpoint should accept POST requests with this payload:

```json
{
  "message": "User's message",
  "timestamp": "2025-10-15T23:35:49.000Z",
  "user_id": "anonymous",
  "source": "ClinicIQ Solutions Chat",
  "type": "chat_message",
  "origin": "https://your-site.netlify.app",
  "conversation_id": "uuid-v4-string",
  "is_new_conversation": true,
  "message_count": 1,
  "conversation_started_at": "2025-10-15T23:35:49.000Z"
}
```

## Expected Webhook Response Format

Your webhook should return JSON in one of these formats:

**Format 1 (Preferred)**:
```json
[{"output": "Bot's response message"}]
```

**Format 2**:
```json
{
  "response": "Bot's response message"
}
```

**Format 3**:
```json
{
  "message": "Bot's response message"
}
```

---

## Testing the Fix

After configuring the webhook URL:

1. **Check Netlify logs** to verify no more 404 errors
2. **Test the chatbot** on your site
3. **Verify responses** are coming through correctly

---

## Current Behavior (After Fix)

✅ **404 errors now handled gracefully**
- Users see: "Thanks for your message! We'll get back to you soon..."
- No error thrown to user
- Logged in Netlify for debugging

✅ **Other errors still caught**
- Network issues → fallback message
- Timeout (30s) → "try again" message
- Invalid webhook → configuration error

---

## Testing Your Webhooks

Run the included test script to verify all webhook endpoints are working:

```bash
# Run the test script
./test-webhooks.sh
```

This will test all three webhook endpoints and show you which ones are working correctly.

## Deploying the Fix

```bash
# 1. Commit all updated functions
git add netlify/functions/ WEBHOOK_SETUP.md test-webhooks.sh
git commit -m "fix: Add graceful 404 error handling to all webhooks"
git push

# 2. Netlify will auto-deploy

# 3. Verify on your live site that forms work properly
```

---

## Need Help?

If you need to set up a chatbot service, popular options include:
- **OpenAI GPT-4** (via API)
- **Dialogflow** (Google)
- **Make.com** (no-code automation)
- **Zapier** (webhook automation)
- **Custom Node.js API** (full control)
