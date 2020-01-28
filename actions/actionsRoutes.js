const express = require("express");
const helpers = require("../data/helpers/actionModel.js");

const router = express.Router();

module.exports = router;

//  GET
router.get("/", (req, res) => {
  helpers
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => console.log(err));
});

// POST

// DELETE

// UPDATE
