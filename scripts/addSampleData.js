import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const sampleServices = [
  {
    icon: "🚚",
    name: "Home Moving",
    description: "Professional home moving service with experienced team and proper equipment",
    category: "Moving",
    price: 500,
    duration: 240,
    isActive: true,
    features: ["Professional team", "Packing materials", "Insurance coverage"]
  },
  {
    icon: "❄️",
    name: "AC Installation",
    description: "Complete AC installation service including electrical work and testing",
    category: "Installation",
    price: 300,
    duration: 120,
    isActive: true,
    features: ["Professional installation", "Testing", "1 year warranty"]
  },
  {
    icon: "🔧",
    name: "Plumbing Repair",
    description: "Expert plumbing repair services for all types of issues",
    category: "Repair",
    price: 150,
    duration: 90,
    isActive: true,
    features: ["Emergency service", "Quality parts", "Guaranteed work"]
  },
  {
    icon: "🎨",
    name: "House Painting",
    description: "Professional house painting service with premium quality paints",
    category: "Maintenance",
    price: 800,
    duration: 480,
    isActive: true,
    features: ["Premium paints", "Professional finish", "Clean up included"]
  },
  {
    icon: "🔨",
    name: "Furniture Assembly",
    description: "Expert furniture assembly service for all brands and types",
    category: "Handyman",
    price: 100,
    duration: 60,
    isActive: true,
    features: ["All brands", "Tools included", "Quick service"]
  }
];

const addSampleData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Add sample services
    const services = await Service.insertMany(sampleServices);
    console.log(`✅ Added ${services.length} sample services`);

    // Add sample bookings
    const sampleBookings = [
      {
        customerName: "Ahmed Hassan",
        customerEmail: "ahmed@example.com",
        customerPhone: "+971501234567",
        serviceId: services[0]._id, // Home Moving
        bookingDate: new Date('2026-03-05'),
        bookingTime: "10:00 AM",
        address: "Dubai Marina, Tower 3, Apt 1205",
        notes: "Need to move 2 bedroom apartment. Have elevator access.",
        status: "pending"
      },
      {
        customerName: "Sarah Ahmed",
        customerEmail: "sarah@example.com",
        customerPhone: "+971559876543",
        serviceId: services[1]._id, // AC Installation
        bookingDate: new Date('2026-03-05'),
        bookingTime: "2:00 PM",
        address: "Downtown Dubai, Burj Khalifa District",
        notes: "Install 2 split AC units in living room and bedroom",
        status: "confirmed"
      },
      {
        customerName: "Mohammed Ali",
        customerEmail: "mohammed@example.com",
        customerPhone: "+971567890123",
        serviceId: services[2]._id, // Plumbing Repair
        bookingDate: new Date('2026-03-04'),
        bookingTime: "9:00 AM",
        address: "Jumeirah Beach Residence, Block A",
        notes: "Kitchen sink is leaking and bathroom tap needs replacement",
        status: "in-progress"
      },
      {
        customerName: "Fatima Khan",
        customerEmail: "fatima@example.com",
        customerPhone: "+971512345678",
        serviceId: services[3]._id, // House Painting
        bookingDate: new Date('2026-03-03'),
        bookingTime: "8:00 AM",
        address: "Arabian Ranches, Villa 123",
        notes: "Paint entire villa exterior. White color preferred.",
        status: "completed"
      },
      {
        customerName: "Omar Abdullah",
        customerEmail: "omar@example.com",
        customerPhone: "+971598765432",
        serviceId: services[4]._id, // Furniture Assembly
        bookingDate: new Date('2026-03-06'),
        bookingTime: "11:00 AM",
        address: "Business Bay, Executive Tower",
        notes: "Assemble IKEA wardrobe and study desk",
        status: "pending"
      }
    ];

    const bookings = await Booking.insertMany(sampleBookings);
    console.log(`✅ Added ${bookings.length} sample bookings`);

    console.log('\n🎉 Sample data added successfully!');
    console.log('You can now test the application with sample services and bookings.');

  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};

addSampleData();