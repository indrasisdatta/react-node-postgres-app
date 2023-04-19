const express = require("express");
const {
  getUserTeams,
  updateUser,
  login,
  getAllTeams,
  getManagerByTeam,
} = require("../Controllers/UserController");

const router = express.Router();

router.get("/teams", getUserTeams);
router.get("/teams_list", getAllTeams);
router.post("/login", login);
router.post("/teamwise_managers", getManagerByTeam);
router.post("/:userId", updateUser);

module.exports = router;
