// WhatsApp Configuration
export const whatsappConfig = {
  businessNumber: process.env.WHATSAPP_BUSINESS_NUMBER || "971566118908",
  
  // Message templates
  templates: {
    newBooking: (booking, service) => `🎉 *New Service Booking*

📋 *Booking Details:*
• Customer: ${booking.customerName}
• Email: ${booking.customerEmail}
• Phone: ${booking.customerPhone}

🔧 *Service:*
• Service: ${service.name}
• Category: ${service.category}
• Price: AED ${service.price}

📅 *Schedule:*
• Date: ${new Date(booking.bookingDate).toLocaleDateString()}
• Time: ${booking.bookingTime}

📍 *Location:*
${booking.address}

📝 *Notes:*
${booking.notes || 'No additional notes'}

---
*Booking ID: #${booking._id.toString().slice(-6)}*
*Status: Pending Confirmation*

Please confirm this booking and contact the customer.`,

    bookingStatusUpdate: (booking, service, newStatus) => `📋 *Booking Status Update*

*Booking ID:* #${booking._id.toString().slice(-6)}
*Customer:* ${booking.customerName}
*Service:* ${service.name}
*Status:* ${newStatus.toUpperCase()}

*Customer Phone:* ${booking.customerPhone}
*Date:* ${new Date(booking.bookingDate).toLocaleDateString()}
*Time:* ${booking.bookingTime}`,

    customerConfirmation: (booking, service) => `✅ *Booking Confirmed*

Hello ${booking.customerName}!

Your booking has been confirmed:

🔧 *Service:* ${service.name}
📅 *Date:* ${new Date(booking.bookingDate).toLocaleDateString()}
⏰ *Time:* ${booking.bookingTime}
📍 *Address:* ${booking.address}
💰 *Price:* AED ${service.price}

*Booking ID:* #${booking._id.toString().slice(-6)}

Our team will contact you 30 minutes before the scheduled time.

Thank you for choosing All in One Pros! 🙏`
  },

  // Generate WhatsApp URL
  generateWhatsAppUrl: (phoneNumber, message) => {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  },

  // Format phone number for WhatsApp
  formatPhoneNumber: (phone) => {
    let cleanNumber = phone.replace(/[^0-9]/g, '');
    
    // Add country code if not present
    if (!cleanNumber.startsWith('971') && cleanNumber.length === 9) {
      cleanNumber = '971' + cleanNumber;
    }
    
    return cleanNumber;
  }
};

export default whatsappConfig;