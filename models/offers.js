const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    // price: { type: String, required: true }
});

OfferSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });

module.exports = mongoose.model("Offer", OfferSchema);