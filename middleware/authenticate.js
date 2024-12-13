// middleware/authenticate.js

const isAuth = (req, res, next) => {
  console.log("Session User:", req.session.user); // Debugging
  if (req.session.user === undefined) {
    return res.status(401).json("You do not have access.");
  }
  next();
};

module.exports = {
  isAuth,
};
