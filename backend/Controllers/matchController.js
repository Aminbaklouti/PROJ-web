const Match = require("../models/Match");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getMatches = async (request, response) => {
  try {
    const matches = await Match.find();
    if (matches && matches.length > 0) {
      response.status(200).json({ matches });
    } else {
      response.status(404).json({ msg: "No matches found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      msg: "Error on getting matches",
    });
  }
};

const getMatchesById = async (request, response) => {
  const id = request.user.id;
  try {
    const matches = await Match.find({userId1: id}, {_id: 0, userId2: 1});
    const finalMatches = await Match.find({ userId2: id, userId1: {$in: matches.map(m => m.userId2)} } );
    const Users = await User.find({ _id: { $in: finalMatches.map(m => m.userId1) } });
    if (Users && Users.length > 0) {
      response.status(200).json(Users);
    } else {
      response.status(404).json({ msg: "No matches found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      msg: "Error on getting matches",
    });
  }
};

const checkMatch = async (req, res) => {
  const {userId2} = request.body;
  const date = new Date();
  const userId1 = req.user.id;

  try {
    const foundUser = await User.findById(id);
    if (foundUser) {
      res.status(200).json({ user: foundUser });
    } else {
      res.status(404).json({ msg: "No user found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error on retrieving the user",
    });
  }
};
const postMatch = async (request, response) => {
  const {userId2, partyCode} = request.body;
  const date = new Date();
  const userId1 = request.user.id;

  try {
    const foundMatch = await Match.findOne({ userId1, userId2 });
    if (foundMatch) {
      response.status(400).json({
        msg: "match already exist",
      });
    } else {
      console.log({userId1, userId2, date, partyCode})
      const newMatch = new Match({userId1, userId2, date, partyCode});
      await newMatch.save();
      response
        .status(200)
        .json({ newMatch, msg: "Match successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "error on adding match" });
  }
};

module.exports = { getMatches, postMatch, checkMatch, getMatchesById };
