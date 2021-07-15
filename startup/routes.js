const express = require("express");
const api = require("../controllers");
const router = express.Router();

router.post(
  "/create-user",
  api.userCtrl.CreateUser
);

router.get(
  "/decrypt-user/:userName",
  api.userCtrl.decryptUser
);

module.exports = router;
