import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: { 
      type: String, 
      required: true,
      trim: true
    },
    customerEmail: { 
      type: String, 
      required: true,
      trim: true,
      lowercase: true
    },
    customerPhone: { 
      type: String, 
      required: true,
      trim: true
    },
    serviceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Service', 
      required: true 
    },
    bookingDate: { 
      type: Date, 
      required: true 
    },
    bookingTime: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    notes: { 
      type: String, 
      default: "" 
    },
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"], 
      default: "pending" 
    },
    // Legacy fields for backward compatibility
    name: { type: String },
    phone: { type: String },
    service: { type: String },
    pickup: { type: String, default: "" },
    drop: { type: String, default: "" },
    date: { type: String },
    time: { type: String }
  },
  { 
    timestamps: true 
  }
);

// Pre-save middleware to handle legacy data
bookingSchema.pre('save', function(next) {
  // If legacy fields are used, map them to new fields
  if (this.name && !this.customerName) {
    this.customerName = this.name;
  }
  if (this.phone && !this.customerPhone) {
    this.customerPhone = this.phone;
  }
  if (this.date && !this.bookingDate) {
    this.bookingDate = new Date(this.date);
  }
  if (this.time && !this.bookingTime) {
    this.bookingTime = this.time;
  }
  
  next();
});

export default mongoose.model("Booking", bookingSchema);
