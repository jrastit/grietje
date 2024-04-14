const express = require("express");

const router = express.Router();

const test = require("./test");
const user = require("./user");
const wallet = require("./wallet");
const h3 = require("./h3");

router.use("/test", test);
router.use("/user", user);
router.use("/wallet", wallet);
router.use("/h3", h3);

router.get("/", (request, response) => {
  const status = {
    Api: "Running",
  };

  response.send(status);
});

module.exports = router;
