const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookOfferSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    offer: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model("BookOffer", BookOfferSchema);