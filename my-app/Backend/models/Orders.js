const mongoose = require("mongoose");

// Rename schema to avoid confusion
const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Corrected "require" to "required"
    },
    orders: {
      type: Array,
      required: true,  // Corrected "require" to "required"
    },
  },
  { timestamps: true }
);

// Creating the model with a more appropriate name
const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
