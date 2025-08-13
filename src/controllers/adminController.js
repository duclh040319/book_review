import { request, response } from "express";

import Book from "../models/Book.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import { multipleMongoToObject } from "../utils/mongoose.js";

class AdminController {
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async index(req, res) {
    res.render("admin/index", {
      title: "Dashboard-admin",
      layout: "admin",
      admin: req.user.username,
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async statistic(req, res) {
    try {
      // Sử dụng Promise.all để chạy các truy vấn song song, tăng hiệu suất
      const [totalReviews, highestRatedReview, top10Books] = await Promise.all([
        Review.countDocuments({}),
        Review.findOne().sort({ rating: -1 }).populate("bookId"),
        Review.aggregate([
          {
            $group: {
              _id: "$bookId", // Nhóm các bài đánh giá theo ID sách
              averageRating: { $avg: "$rating" }, // Tính điểm đánh giá trung bình
              reviewCount: { $sum: 1 }, // Đếm số lượng đánh giá
            },
          },
          { $sort: { averageRating: -1 } }, // Sắp xếp theo điểm trung bình giảm dần
          { $limit: 10 }, // Giới hạn ở 10 kết quả hàng đầu
          {
            $lookup: {
              // Join với collection 'books' để lấy thông tin chi tiết
              from: "books", // Tên collection từ model 'Book'
              localField: "_id",
              foreignField: "_id",
              as: "bookDetails",
            },
          },
          { $unwind: "$bookDetails" }, // Tách mảng thành các document riêng lẻ
          {
            $project: {
              // Chọn và định dạng lại các trường cuối cùng
              title: "$bookDetails.title", // Lấy từ schema của Book [cite: 4]
              author: "$bookDetails.author", // Lấy từ schema của Book [cite: 4]
              averageRating: { $round: ["$averageRating", 1] }, // Làm tròn điểm
              reviewCount: "$reviewCount",
            },
          },
        ]),
      ]);

      const highestRatedBookTitle = highestRatedReview
        ? highestRatedReview.bookId.title
        : "Chưa có";

      res.render("admin/statistic", {
        title: "Statistic",
        layout: "admin",
        admin: req.user.username,
        totalReviews,
        highestRatedBookTitle,
        top10Books: top10Books, // Truyền danh sách top 10 sách vào view
      });
    } catch (err) {
      console.error(err);
      res.render("admin/statistic", {
        title: "Statistic",
        layout: "admin",
        admin: req.user.username,
        top10Books: [], // Truyền một mảng rỗng trong trường hợp có lỗi
      });
    }
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async bookManage(req, res) {
    Book.find({})
      .then((data) => {
        res.render("admin/bookManage", {
          title: "Book Manager",
          layout: "admin",
          books: multipleMongoToObject(data),
          admin: req.user.username,
        });
      })
      .catch((err) => {
        res.render("admin/bookManage", {
          title: "Book Manager",
          layout: "admin",
          books: "",
        });
      });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async user(req, res) {
    try {
      const usersWithReviewCount = await User.aggregate([
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "userId",
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviewCount: { $size: "$reviews" },
          },
        },
        {
          $project: {
            reviews: 0,
          },
        },
      ]);

      res.render("admin/user", {
        title: "User",
        layout: "admin",
        users: usersWithReviewCount,
        admin: req.user.username,
      });
    } catch (err) {
      console.error(err);
      res.render("admin/user", {
        title: "User",
        layout: "admin",
        users: [],
        admin: req.user.username,
      });
    }
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async review(req, res) {
    try {
      const reviews = await Review.find({})
        .populate("bookId")
        .populate("userId"); // Populate to get book and user details

      res.render("admin/review", {
        title: "Reviews",
        layout: "admin",
        reviews: multipleMongoToObject(reviews),
        admin: req.user.username,
      });
    } catch (err) {
      console.error(err);
      res.render("admin/review", {
        title: "Reviews",
        layout: "admin",
        reviews: [], // Pass an empty array in case of an error
        admin: req.user.username,
      });
    }
  }
  /**
   * Endpoint để lấy thông tin chi tiết của một cuốn sách
   * @param {request} req
   * @param {response} res
   */
  async getBook(req, res) {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  /**
   * * @param {request} req
   * @param {response} res
   * @returns
   */
  async getReview(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId)
        .populate("bookId")
        .populate("userId");

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async setting(req, res) {
    res.render("admin/setting", {
      title: "Setting",
      layout: "admin",
      admin: req.user.username,
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async redirectIndex(req, res) {
    res.redirect("/admin/dashboard");
  }
}

export default new AdminController();
