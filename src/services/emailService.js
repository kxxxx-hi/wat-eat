// Email service for sending order notifications
// Using a simple webhook approach that can work with services like Formspree, EmailJS, or custom endpoints

export const sendOrderNotification = async (orderData) => {
  try {
    // Using your Formspree endpoint
    const formspreeUrl = 'https://formspree.io/f/mwprqwoe';
    
    // Format the order data for email
    const orderSummary = formatOrderSummary(orderData);
    
    console.log('📧 Sending email notification to yyyangkx@gmail.com...');
    console.log('📋 Order Summary:', orderSummary);
    
    const formData = new FormData();
    formData.append('_to', 'yyyangkx@gmail.com');
    formData.append('_subject', `New Order - ${new Date().toLocaleDateString()}`);
    formData.append('_replyto', 'yyyangkx@gmail.com');
    formData.append('message', orderSummary);
    formData.append('order_data', JSON.stringify(orderData, null, 2));
    
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('✅ Order notification email sent successfully!');
      return { success: true };
    } else {
      console.error('❌ Failed to send order notification email:', response.status, response.statusText);
      return { success: false, error: 'Failed to send email' };
    }
  } catch (error) {
    console.error('Error sending order notification:', error);
    return { success: false, error: error.message };
  }
};

const formatOrderSummary = (orderData) => {
  const { items, subtotal, timestamp } = orderData;
  const orderDate = new Date(timestamp).toLocaleString();
  
  let summary = `🍽️ New Order Received!\n\n`;
  summary += `Order Date: ${orderDate}\n\n`;
  summary += `Order Items:\n`;
  
  items.forEach((item, index) => {
    summary += `${index + 1}. ${item.name} x${item.quantity} - $${(item.cost * item.quantity).toFixed(2)}\n`;
  });
  
  summary += `\nTotal: $${subtotal.toFixed(2)} SGD\n\n`;
  summary += `Thank you for using Wat Eat! 🎉`;
  
  return summary;
};

const formatOrderEmail = (orderData) => {
  const { items, subtotal, timestamp } = orderData;
  
  const orderDate = new Date(timestamp).toLocaleString();
  
  let itemsHtml = '';
  items.forEach((item, index) => {
    itemsHtml += `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.cost.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.cost * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order Notification</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f5f1e8 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: #4a4a4a; margin: 0; text-align: center;">🍽️ New Order Received!</h1>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4a4a4a; border-bottom: 2px solid #a8b5a8; padding-bottom: 10px;">Order Summary</h2>
        
        <p><strong>Order Date:</strong> ${orderDate}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #a8b5a8;">Item</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #a8b5a8;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #a8b5a8;">Unit Price</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #a8b5a8;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 20px; padding-top: 20px; border-top: 2px solid #a8b5a8;">
          <h3 style="color: #4a4a4a; margin: 0;">Total: $${subtotal.toFixed(2)} SGD</h3>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <p style="margin: 0; color: #6b6b6b;">Thank you for using Wat Eat! 🎉</p>
      </div>
    </body>
    </html>
  `;
};

// Alternative: EmailJS implementation (uncomment and configure if you prefer EmailJS)
/*
import emailjs from '@emailjs/browser';

export const sendOrderNotificationEmailJS = async (orderData) => {
  try {
    const emailContent = formatOrderEmail(orderData);
    
    const templateParams = {
      to_email: 'yyyangkx@gmail.com',
      subject: `New Order - ${new Date().toLocaleDateString()}`,
      message: emailContent,
      order_summary: JSON.stringify(orderData, null, 2)
    };

    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );

    console.log('Order notification email sent successfully:', response);
    return { success: true };
  } catch (error) {
    console.error('Error sending order notification:', error);
    return { success: false, error: error.message };
  }
};
*/
