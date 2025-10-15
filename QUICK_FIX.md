# 🚀 Quick Fix Guide - Update to Production Webhooks

## ✅ What We Found

You were using **TEST** webhook URLs instead of **PRODUCTION** URLs.

- ❌ Test URLs: `https://dermalink.xyz/webhook-test/...` (404 errors)
- ✅ Production URLs: `https://dermalink.xyz/webhook/...` (working!)

---

## 📋 Step 1: Update Netlify Environment Variables

**Go to Netlify Dashboard** → Your Site → **Site settings** → **Environment variables**

Update these three variables:

### 1. CHATBOT_WEBHOOK_URL
```
https://dermalink.xyz/webhook/cliniciqchat
```

### 2. CONTACT_FORM_WEBHOOK_URL
```
https://dermalink.xyz/webhook/cliniciqemail
```

### 3. NEWSLETTER_WEBHOOK_URL
```
https://dermalink.xyz/webhook/cliniciqsubs
```

**Important**:
- Remove `/webhook-test/`
- Replace with `/webhook/`
- Apply to **ALL deploy contexts** (Production, Deploy Previews, Branch deploys, etc.)

---

## 📋 Step 2: Deploy the Code Fixes

```bash
# Commit the improved error handling
git add netlify/functions/ WEBHOOK_SETUP.md test-webhooks.sh QUICK_FIX.md
git commit -m "fix: Add graceful 404 error handling and update to production webhooks"
git push
```

Netlify will automatically deploy your changes.

---

## 📋 Step 3: Verify Everything Works

After Netlify redeploys (usually 1-2 minutes):

1. **Test the Chatbot**
   - Open your live website
   - Click the chat icon
   - Send a test message
   - You should get an AI response

2. **Test the Contact Form**
   - Fill out the contact form
   - Submit it
   - You should see a success message

3. **Test the Newsletter**
   - Enter an email address
   - Subscribe
   - You should see a success message

---

## 🎯 Expected Results

### Before Fix:
- ❌ 404 errors in Netlify logs
- ❌ Webhooks not working
- ❌ Forms failing silently

### After Fix:
- ✅ All webhooks returning 200 OK
- ✅ Chatbot provides AI responses
- ✅ Contact form submissions recorded
- ✅ Newsletter subscriptions recorded
- ✅ Graceful error handling if webhooks fail

---

## 🧪 Optional: Run Test Script

To verify webhooks before updating Netlify:

```bash
./test-webhooks.sh
```

All three should show **✓ SUCCESS (Status: 200)**

---

## 📊 Summary of Changes

### Files Modified:
1. ✅ `netlify/functions/chatbot.js` - Added graceful 404 handling
2. ✅ `netlify/functions/contact-form.js` - Added graceful 404 handling
3. ✅ `netlify/functions/newsletter.js` - Added graceful 404 handling
4. ✅ `test-webhooks.sh` - Updated to production URLs
5. ✅ `WEBHOOK_SETUP.md` - Updated documentation

### Netlify Environment Variables (TO BE UPDATED):
1. ⏳ `CHATBOT_WEBHOOK_URL` - Change to production URL
2. ⏳ `CONTACT_FORM_WEBHOOK_URL` - Change to production URL
3. ⏳ `NEWSLETTER_WEBHOOK_URL` - Change to production URL

---

## ⏱️ Total Time: ~5 minutes

1. Update 3 environment variables in Netlify: **2 minutes**
2. Git commit and push: **1 minute**
3. Wait for Netlify deploy: **1-2 minutes**
4. Test on live site: **1 minute**

---

## 🆘 Need Help?

If you encounter any issues:

1. Check Netlify deploy logs for errors
2. Run `./test-webhooks.sh` to verify webhook connectivity
3. Check browser console for JavaScript errors
4. Review Netlify function logs in dashboard

---

**You're ready to go!** 🎉

Once you update the environment variables and deploy, everything will work perfectly.
