const express = require("express");
const partyRoute = express.Router();
const {
  getOneParty, postParty, deleteParty, getParties, getAttendees, addAttendee
} = require("../Controllers/partyController");
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");

partyRoute.get("/party/:code", isAuth, isAutho(["user", "admin"]), getOneParty);
partyRoute.get("/parties", isAuth, isAutho(["admin"]), getParties);
partyRoute.post("/parties", isAuth, isAutho(["admin"]), postParty);
partyRoute.get("/partyAttendees/:code", isAuth, isAutho(["admin", "user"]), getAttendees);
partyRoute.post("/addAttendee", isAuth, isAutho(["admin", "user"]), addAttendee);
partyRoute.delete("/party/:id", isAuth, isAutho(["admin"]), deleteParty);
module.exports = partyRoute;
