const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ 
            $or: [
              { googleId: profile.id },
              { email: profile.emails[0].value }
            ]
          });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              isAdmin: false
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }

          const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );

          return done(null, { user, token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((data, done) => {
    done(null, { id: data.user._id, token: data.token });
  });

  passport.deserializeUser(async (data, done) => {
    try {
      const user = await User.findById(data.id);
      done(null, { user, token: data.token });
    } catch (err) {
      done(err, null);
    }
  });
};