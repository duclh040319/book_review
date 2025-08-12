import mongoose from "mongoose";
import User from './User.js'
import Book from "./Book.js";
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

export default Review