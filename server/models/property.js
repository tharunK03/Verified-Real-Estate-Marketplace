const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // ✅ Property Title
    type: { type: String, enum: ["Independent House", "Flat", "Plot"], required: true }, // ✅ Property Type
    location: { type: String, required: true, trim: true }, // ✅ Location (City, State)
    price: { type: Number, required: true, min: 1 }, // ✅ Price Validation
    sqft: { type: Number, required: true, min: 1 }, // ✅ Square Feet Validation
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Reference to User (Seller)
    imageLink: { type: String, required: true }, // ✅ Google Drive Image Link
    documentLink: { type: String, required: true }, // ✅ Google Drive Document Link
    status: {
      type: String,
      enum: ["Pending Admin Approval", "Approved", "Rejected"],
      default: "Pending Admin Approval",
    }, // ✅ Property Status
  },
  { timestamps: true } // ✅ Auto add createdAt & updatedAt
);

module.exports = mongoose.model("Property", PropertySchema);