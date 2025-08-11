const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const compression = require("compression");
const methodOverride = require("method-override");

const routes = require("./routes");

//Connect to Database
const db = require("./config/database");
db();

//Config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 30, // 1 hour
      httpOnly: true,
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      // Custom helpers for pagination
      for: function (from, to, incr, block) {
        let accum = "";
        for (let i = from; i <= to; i += incr) {
          accum += block.fn(i);
        }
        return accum;
      },
       sum: function (a, b) {
        return a + b
      },
      eq: function (a, b) {
        return a === b;
      },
      add: function (a, b) {
        return a + b;
      },
      sub: function (a, b) {
        return a - b;
      },
      if_eq: function (a, b, options) {
        if (a == b) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      generateStars10: function (rating) {
        let stars = "";
        const roundedRating = Math.round(rating); // Làm tròn điểm số để hiển thị sao

        for (let i = 1; i <= 10; i++) {
          if (i <= roundedRating) {
            stars += "<span>★</span>"; // Sao vàng
          } else {
            stars += "<span>☆</span>"; // Sao rỗng
          }
        }
        return stars;
      },
     
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

routes(app);

//Run server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
