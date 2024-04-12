const express = require("express");

const router = express.Router();

const status = require("./status");
const user = require("./user");

router.use("/", status);
router.use("/user", user);

router.get("/", (request, response) => {
  const status = {
    Api: "Running",
  };

  response.send(status);
});

module.exports = router;
