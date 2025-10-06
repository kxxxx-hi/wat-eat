# Email Notification Setup Guide

This guide will help you set up email notifications for new orders.

## Option 1: Formspree (Recommended - Free & Easy)

1. **Create a Formspree account:**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for a free account

2. **Create a new form:**
   - Click "New Form"
   - Choose "Contact Form"
   - Name it "Wat Eat Order Notifications"

3. **Get your form endpoint:**
   - Copy your form endpoint URL (looks like `https://formspree.io/f/xxxxxxxxxx`)
   - Replace `YOUR_FORM_ID` in `src/services/emailService.js` with your form ID

4. **Configure email settings:**
   - In Formspree dashboard, set the recipient email to `yyyangkx@gmail.com`
   - Enable email notifications

## Option 2: EmailJS (Alternative)

1. **Create an EmailJS account:**
   - Go to [emailjs.com](https://emailjs.com)
   - Sign up for a free account

2. **Set up email service:**
   - Connect your email service (Gmail, Outlook, etc.)
   - Create an email template for order notifications

3. **Install EmailJS:**
   ```bash
   npm install @emailjs/browser
   ```

4. **Update the service:**
   - Uncomment the EmailJS code in `emailService.js`
   - Replace the placeholder IDs with your actual EmailJS IDs

## Option 3: Custom Webhook (Advanced)

1. **Set up a webhook service:**
   - Use Zapier, Make.com, or create your own endpoint
   - Configure it to send emails when triggered

2. **Update the webhook URL:**
   - Replace the webhook URL in `emailService.js`

## Testing

1. **Test the email functionality:**
   - Place a test order
   - Check the browser console for success/error messages
   - Verify the email is received at `yyyangkx@gmail.com`

2. **Email content includes:**
   - Order date and time
   - List of items with quantities and prices
   - Total amount
   - Formatted nicely for easy reading

## Troubleshooting

- **Email not received:** Check spam folder
- **Console errors:** Verify the service configuration
- **Formspree limits:** Free tier has 50 submissions/month
- **CORS issues:** Use a service that supports CORS or proxy requests

## Current Configuration

The email service is currently configured to send emails to: `yyyangkx@gmail.com`

To change the recipient email, update the `_to` field in `emailService.js`.
