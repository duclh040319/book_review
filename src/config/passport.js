import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;

import User from "../models/User.js";
passport.use(
  new LocalStrategy("local", async (username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        // If the user is not found, authentication fails.
        if (!user) {
          return done(null, false);
        }

        // Compare the provided username and password with the user in the database.
        // It's assumed here that a real-world application would use a library like bcrypt
        // to securely hash and compare passwords.
        if (user.username !== username || user.password !== password) {
          return done(null, false);
        }

        // If the username and password match, the user is authenticated.
        return done(null, user);
      })
      .catch((err) => {
        // Pass the error to the `done` callback.
        return done(err);
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(null, err));
});
