const express = require("express");
const USER = require("../../../model/user");
const router = express.Router();
router.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});
router.get("/ping", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});
router.delete("/user", (request, response) => {
  try {
    id = request.user.id;

    request.logout(function (err) {  // logout of passport
      try {
        USER.destroy({
          where: {
            id: id,
          },
        }).then((result) => {
          response.send({ 'user': { 'id': '0' } });
        }).catch((err) => {
          response.status(500).send(err);
        });
      } catch (err) {
        response.status(500).send(err);
      }

    });
  } catch (err) {
    response.status(500).send(err);
  }

});
module.exports = router;
