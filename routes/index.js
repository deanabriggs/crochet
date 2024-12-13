// Requipre resources
const router = require("express").Router();
const passport = require("passport");

// Sub-routes
router.use("/contributors", require("./contributors"));
router.use("/projects", require("./projects"));
router.use("/", require("./swagger"));

// Logging in and out using passport with github
router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Export router
module.exports = router;
