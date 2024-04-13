const express = require("express");

const router = express.Router();

const test = require("./test");
const user = require("./user");

router.use("/test", test);
router.use("/user", user);

router.get("/", (request, response) => {
  const status = {
    Api: "Running",
  };

  response.send(status);
});

module.exports = router;
