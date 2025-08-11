const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const bookRouter = require("./bookRoutes");
const profileRouter = require('./profileRoutes')
const adminRouter = require('./adminRoutes')
const { isLogin, isAdmin } = require("../middlewares/checkAuth");
const routes = (app) => {
  app.use("/api/v1/user",isLogin, profileRouter)
  app.use("/api/v1/books", isLogin, bookRouter);
  app.use("/api/v1/auth",  authRouter);
  app.use("/admin",isLogin,isAdmin, adminRouter);
  app.use("/", homeRouter);
  app.use("/", (req, res) => {
    res.status(404).render('404');
  });
};

module.exports = routes;
