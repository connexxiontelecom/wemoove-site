let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("offerings", {
    title: "Our Offerings | WeMoove - Convenient & Safe Ride Sharing",
    pageName: "Our Offerings",
  });
});

module.exports = router;
