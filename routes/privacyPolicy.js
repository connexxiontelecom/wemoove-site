let express = require("express");
let router = express.Router();

/* GET privacy policy page. */
router.get("/", function (req, res, next) {
  res.render("privacyPolicy", {
    title: "Privacy Policy | WeMoove - Convenient & Safe Ride Sharing",
    pageName: "Privacy Policy",
  });
});

module.exports = router;
