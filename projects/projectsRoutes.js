const express = require("express");
const helpers = require("../data/helpers/projectModel.js");
const action_helpers = require("../data/helpers/actionModel.js");

const router = express.Router();

// GET
router.get("/", (req, res) => {
  helpers
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => console.log(err));
});

// POST
router.post("/", (req, res) => {
  helpers
    .insert(req.body)
    .then(p => {
      res.status(201).json(p);
    })
    .catch(err => console.log(err));
});

// DELETE
router.delete("/:id", (req, res) => {
  helpers
    .remove(req.params.id)
    .then(d => {
      res.status(201).json(d);
    })
    .catch(err => console.log(err));
});

// PUT
router.put("/:id", (req, res) => {
  helpers
    .update(req.params.id, req.body)
    .then(u => {
      res.status(201).json(u);
    })
    .catch(err => console.log(err));
});

// I think actions should go after projects, since they are kind of a sub-category and are associated with a single project

//GET all
router.get("/actions", (req, res) => {
  action_helpers
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => console.log(err));
});

// POST
router.post("/actions/", (req, res) => {
  action_helpers
    .insert(req.body)
    .then(a => {
      console.log(a);
      res.status(201).json(a);
    })
    .catch(err => console.log(err));
});

// DELETE
router.delete("/actions/:actionId", (req, res) => {
  action_helpers
    .remove(req.params.actionId)
    .then(a => {
      res.status(201).json(a);
    })
    .catch(err => console.log(err));
});

// UPDATE
router.put("/actions/:actionId", (req, res) => {
  action_helpers
    .update(req.params.actionId, req.body)
    .then(u => {
      res.status(201).json(u);
    })
    .catch(err => console.log(err));
});

module.exports = router;
