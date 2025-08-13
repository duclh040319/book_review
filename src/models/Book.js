import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    description: String,
    coverImage: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: Date,
    },
    type: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
