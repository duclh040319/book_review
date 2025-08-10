const mongoose = require("mongoose");
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
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
