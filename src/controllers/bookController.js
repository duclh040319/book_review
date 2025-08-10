const Book = require("../models/Book");
const Review = require("../models/Review");
const { mongooseToObject, multipleMongoToObject } = require("../utils/mongoose");
const {highlightText} = require('../middlewares/const')
const books = require('../../books.json')

class BookController {
  
  async index(req, res) {
    
    const user = await req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    try {
      const searchCondition = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      };
      
      const totalBooks = await Book.countDocuments(searchCondition);
      const totalPages = Math.ceil(totalBooks / limit);

      const books = await Book.find(searchCondition).skip(skip).limit(limit);
      
      const booksWithRatings = await Promise.all(books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id });
        let averageRating = 0;
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
          averageRating = (totalRating / reviews.length).toFixed(1);
        }
        
        // Highlight title and author
        const highlightedTitle = highlightText(book.title, search);
        const highlightedAuthor = highlightText(book.author, search);
        
        // **Thêm logic xử lý hình ảnh mặc định**
        const coverImage = book.coverImage || 'https://via.placeholder.com/400x200';

        return {
          ...book.toObject(),
          averageRating,
          highlightedTitle,
          highlightedAuthor,
          coverImage: coverImage, // Truyền thuộc tính đã được xử lý
        };
      }));

      // **Sửa lại tên view thành "home"**
      res.render("book/index", {
        title: "Books",
        userData: mongooseToObject(user),
        books: booksWithRatings,
        currentPage: page,
        totalPages: totalPages,
        totalBooks: totalBooks,
        limit: limit,
        search: search,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  // Các phương thức khác giữ nguyên
  async detail(req, res) {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const reviews = await Review.find({ bookId: bookId }).populate('userId'); 

    const user = await req.user;
    res.render("book/detail", {
      title: "Detail",
      userData: mongooseToObject(user),
      book: mongooseToObject(book),
      reviews: multipleMongoToObject(reviews)
    });
  }

  async addReview(req, res) {
    const userId = req.user._id;
    const bookId = req.params.id;
    const { rating, content } = req.body;
    const newReview =  new Review({
      userId: userId,
      bookId: bookId,
      rating: rating,
      content: content,
    })
    newReview.save()
      .then(() => {res.redirect(req.get('Referer') || '/')})
      .catch(() =>res.status(404).render('404'))
  }
}

module.exports = new BookController();