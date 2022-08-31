let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("safety", {
    title: "Safety | WeMoove - Convenient & Safe Ride Sharing",
    pageName: "Safety",
  });
});

module.exports = router;
