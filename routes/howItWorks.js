let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("howItWorks", {
    title: "How WeMoove Works | WeMoove - Convenient & Safe Ride Sharing",
    pageName: "How WeMoove Works",
  });
});

module.exports = router;
