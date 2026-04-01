import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Basic counts
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const inProgressBookings = await Booking.countDocuments({ status: 'in-progress' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // Today's bookings
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

    // This week's bookings
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const weekBookings = await Booking.countDocuments({
      bookingDate: {
        $gte: startOfWeek,
        $lt: endOfWeek
      }
    });

    // This month's bookings
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const monthBookings = await Booking.countDocuments({
      bookingDate: {
        $gte: startOfMonth,
        $lt: endOfMonth
      }
    });

    // Recent bookings (last 5)
    const recentBookings = await Booking.find()
      .populate('serviceId', 'name price category')
      .sort({ createdAt: -1 })
      .limit(5);

    // Popular services (most booked)
    const popularServices = await Booking.aggregate([
      {
        $group: {
          _id: '$serviceId',
          bookingCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $unwind: '$service'
      },
      {
        $sort: { bookingCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 1,
          bookingCount: 1,
          name: '$service.name',
          category: '$service.category',
          price: '$service.price'
        }
      }
    ]);

    // Revenue calculation (assuming completed bookings generate revenue)
    const revenueData = await Booking.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $unwind: '$service'
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$service.price' },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Monthly revenue trend
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: { 
          status: 'completed',
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'service'
        }
      },
      {
        $unwind: '$service'
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: '$service.price' }
        }
      }
    ]);

    const currentMonthRevenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].monthlyRevenue : 0;

    res.json({
      success: true,
      data: {
        // Basic stats
        totalServices,
        activeServices,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        inProgressBookings,
        completedBookings,
        cancelledBookings,
        
        // Time-based stats
        todayBookings,
        weekBookings,
        monthBookings,
        
        // Financial
        totalRevenue,
        currentMonthRevenue,
        
        // Additional data
        recentBookings,
        popularServices,
        
        // Admin info
        admin: {
          id: req.admin._id,
          email: req.admin.email
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};