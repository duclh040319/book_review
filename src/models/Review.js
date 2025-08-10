const mongoose = require("mongoose");
const User = require("./User");
const Book = require("./Book");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    userId: {
      type: String,
      ref: User,
    },
    bookId: {
      type: String,
      ref: Book,
    },
    rating: {
      type: Number,
      max: 10,
      min: 1,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
