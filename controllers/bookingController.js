import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { validationResult } from 'express-validator';

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('serviceId', 'name price category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId', 'name price category duration');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      bookingDate,
      bookingTime,
      address,
      notes
    } = req.body;

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    if (!service.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Service is not available'
      });
    }

    const booking = new Booking({
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      bookingDate,
      bookingTime,
      address,
      notes,
      status: 'pending'
    });

    await booking.save();

    // Populate service details
    await booking.populate('serviceId', 'name price category duration');

    // Log booking creation for WhatsApp integration
    console.log('📋 New Booking Created:', {
      bookingId: booking._id,
      customer: customerName,
      service: service.name,
      date: bookingDate,
      time: bookingTime,
      phone: customerPhone
    });

    // Generate admin notification message for WhatsApp
    const adminWhatsAppMessage = `🚨 *NEW BOOKING ALERT*

📋 *Booking Details:*
• ID: #${booking._id.toString().slice(-6)}
• Customer: ${customerName}
• Phone: ${customerPhone}
• Email: ${customerEmail}

🔧 *Service:*
• Name: ${service.name}
• Category: ${service.category}
• Price: AED ${service.price}

📅 *Schedule:*
• Date: ${new Date(bookingDate).toLocaleDateString('en-GB')}
• Time: ${bookingTime}

📍 *Address:*
${address}

📝 *Notes:*
${notes || 'No additional notes'}

⚡ *Action Required:*
Please contact the customer to confirm this booking.

---
*All in One Pros - Admin Panel*`;

    console.log('📱 Admin WhatsApp Message Ready:', {
      message: adminWhatsAppMessage.substring(0, 100) + '...',
      customerPhone: customerPhone
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('serviceId', 'name price category duration');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });

  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update booking details
export const updateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      bookingTime,
      address,
      notes
    } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        customerEmail,
        customerPhone,
        bookingDate,
        bookingTime,
        address,
        notes
      },
      { new: true, runValidators: true }
    ).populate('serviceId', 'name price category duration');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get booking statistics
export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const inProgressBookings = await Booking.countDocuments({ status: 'in-progress' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // Get today's bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayBookings = await Booking.countDocuments({
      bookingDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        inProgressBookings,
        completedBookings,
        cancelledBookings,
        todayBookings
      }
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};