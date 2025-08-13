import homeRouter from './homeRoutes.js'
import authRouter from './authRoutes.js'
import bookRouter from './bookRoutes.js'
import profileRouter from './profileRoutes.js'
import adminRouter from './adminRoutes.js'
import featureRouter from './featureRoutes.js'
import { isLogin, isAdmin } from '../middlewares/checkAuth.js'
const routes = (app) => {
  app.use("/api/v1/user",isLogin, profileRouter)
  app.use("/api/v1/books", isLogin, bookRouter);
  app.use("/api/v1/auth",  authRouter);
  app.use("/admin",isLogin,isAdmin, adminRouter);
  app.use("/feature", featureRouter);
  app.use("/", homeRouter);
  app.use("/", (req, res) => {
    res.status(404).render('404');
  });
};

export default routes
