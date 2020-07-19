const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookOfferSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    user : { type: Schema.Types.ObjectId, ref: "User", required: true },
    offer : { type: Schema.Types.ObjectId, ref: "Offer", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

BookOfferSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });

module.exports = mongoose.model("BookOffer", BookOfferSchema);