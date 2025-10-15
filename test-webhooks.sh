#!/bin/bash

# ClinicIQ Solutions Webhook Testing Script
# Tests all three webhook endpoints to verify they're working correctly

echo "========================================"
echo "ClinicIQ Solutions Webhook Test"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Webhook URLs
CHATBOT_URL="https://dermalink.xyz/webhook-test/cliniciqchat"
CONTACT_URL="https://dermalink.xyz/webhook-test/cliniciqemail"
NEWSLETTER_URL="https://dermalink.xyz/webhook-test/cliniciqsubs"

# Test function
test_webhook() {
    local name=$1
    local url=$2
    local payload=$3

    echo "Testing: $name"
    echo "URL: $url"
    echo ""

    # Make the request and capture response
    response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
        -H "Content-Type: application/json" \
        -d "$payload")

    # Extract status code (last line)
    status_code=$(echo "$response" | tail -n 1)

    # Extract body (everything except last line)
    body=$(echo "$response" | head -n -1)

    # Check status code
    if [ "$status_code" -eq 200 ]; then
        echo -e "${GREEN}✓ SUCCESS${NC} (Status: $status_code)"
    elif [ "$status_code" -eq 404 ]; then
        echo -e "${RED}✗ NOT FOUND${NC} (Status: 404)"
        echo "  → The endpoint does not exist or is misconfigured"
    elif [ "$status_code" -eq 500 ]; then
        echo -e "${RED}✗ SERVER ERROR${NC} (Status: 500)"
        echo "  → The webhook server encountered an error"
    else
        echo -e "${YELLOW}⚠ UNEXPECTED${NC} (Status: $status_code)"
    fi

    # Show response body if available
    if [ ! -z "$body" ] && [ "$body" != "" ]; then
        echo "Response: $body"
    fi

    echo ""
    echo "----------------------------------------"
    echo ""
}

# Test 1: Chatbot Webhook
echo "1. CHATBOT WEBHOOK"
test_webhook "Chatbot" "$CHATBOT_URL" '{
  "message": "Test message from webhook validation script",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "user_id": "test_user",
  "source": "ClinicIQ Solutions Chat",
  "type": "chat_message"
}'

# Test 2: Contact Form Webhook
echo "2. CONTACT FORM WEBHOOK"
test_webhook "Contact Form" "$CONTACT_URL" '{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "555-1234",
  "message": "Test contact form submission",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "source": "ClinicIQ Solutions Contact Form"
}'

# Test 3: Newsletter Webhook
echo "3. NEWSLETTER WEBHOOK"
test_webhook "Newsletter" "$NEWSLETTER_URL" '{
  "email": "test@example.com",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
  "source": "ClinicIQ Solutions Newsletter"
}'

# Summary
echo "========================================"
echo "Test Complete"
echo "========================================"
echo ""
echo "Next Steps:"
echo ""
echo "1. If any webhooks returned 404:"
echo "   → Verify the dermalink.xyz endpoints are configured correctly"
echo "   → Check that the webhook URLs in Netlify match the actual endpoints"
echo ""
echo "2. If all webhooks succeed:"
echo "   → Deploy the updated Netlify functions"
echo "   → Test the live website forms"
echo ""
echo "3. Deploy command:"
echo "   git add netlify/"
echo "   git commit -m 'fix: Add graceful 404 error handling to all webhooks'"
echo "   git push"
echo ""
