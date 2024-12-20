const Party = require("../models/Party");
const User = require("../models/User");
require("dotenv").config();

const getParties = async (request, response) => {
  try {
    const parties = await Party.find();
    if (parties && parties.length > 0) {
      response.status(200).json({ parties });
    } else {
      response.status(404).json({ msg: "No parties found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      msg: "Error on getting parties",
    });
  }
};
const getOneParty = async (req, res) => {
  const code = req.params.code;
  try {
    const foundParty = await Party.findOne({ code });
    if (foundParty) {
      res.status(200).json({ party: foundParty });
    } else {
      res.status(404).json({ msg: "No party found" });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error on retrieving the party",
    });
  }
};

const getAttendees = async (req, res) => {
  const code = req.params.code;
  try {
    const foundParty = await Party.findOne({ code });
    if (foundParty) {
      const attendees = await User.find({ parties: foundParty.code, _id: { $ne: req.user.id} });
      res.status(200).json({ attendees });
    } else {
      res.status(404).json({ msg: "No party found" });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error on retrieving the attendees",
    });
  }
};
const postParty = async (request, response) => {
  const party = request.body;
  try {
    const foundParty = await Party.findOne({ code: party.code });
    if (foundParty) {
      response.status(400).json({
        msg: "party already exist",
      });
    } else {
      const newParty = new Party(party);
      await newParty.save();
      response
        .status(200)
        .json({ party: newParty, msg: " party successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "error on adding party" });
  }
};

const addAttendee = async (request, response) => {
  const {partyCode} = request.body;
  const user = request.user;
  try {
    const foundParty = await Party.findOne({ code: partyCode });
    if (foundParty) {
      const U = await User.findByIdAndUpdate(
        user.id,
        { $addToSet: { parties: foundParty.code } }
      )
      response.status(200).json({
        msg: "Successfully added",
      });
    } else {
      response
        .status(400)
        .json({ msg: "Party does not exist" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "error on adding attendee" });
  }
};

const deleteParty = async (req, res) => {
  const id = req.params.id;
  try {
    await Party.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting party" });
  }
};

module.exports = { getOneParty, postParty, deleteParty, getParties, getAttendees, addAttendee };
