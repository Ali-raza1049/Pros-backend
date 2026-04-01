import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "🚚" },
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true, 
      enum: ["Moving", "Fixing", "Handyman", "Cleaning", "Maintenance", "Installation", "Repair", "Other"]
    },
    price: { 
      type: Number, 
      required: true,
      min: 0
    },
    duration: { 
      type: Number, 
      required: true,
      default: 60, // default 1 hour
      min: 15 // minimum 15 minutes
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    features: [{
      type: String
    }]
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model("Service", serviceSchema);
