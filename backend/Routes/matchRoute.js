const express = require("express");
const matchRoute = express.Router();
const {
  getMatches, postMatch, checkMatch, getMatchesById
} = require("../Controllers/matchController");
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
matchRoute.get("/matches", isAuth, isAutho(["user"]), getMatches);
matchRoute.get("/matchesById/", isAuth, isAutho(["user"]), getMatchesById);
matchRoute.post("/match", isAuth, isAutho(["user"]), postMatch);
matchRoute.post("/checkMatch", isAuth, isAutho(["user"]), checkMatch);
module.exports = matchRoute;
