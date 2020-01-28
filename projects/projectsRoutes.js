const express = require("express");
const helpers = require("../data/helpers/projectModel.js");
const action_helpers = require("../data/helpers/actionModel.js");

const router = express.Router();

const checkId = (req, res, next) => {
  helpers.get(req.params.id).then(result => {
    // console.log("RESULT: ", result);
    if (result) {
      next();
    } else {
      res.status(404).json({ message: "Missing not found" });
    }
  });
};

// router.use("/:id", checkId);

// GET
router.get("/", (req, res) => {
  helpers
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// POST
router.post("/", (req, res) => {
  if (req.body.name && req.body.description) {
    helpers
      .insert(req.body)
      .then(p => {
        res.status(201).json(p);
      })
      .catch(err => {
        res.status(500).json({ err: err });
      });
  } else {
    res.status(404).json({ message: "missing body and or field" });
  }
});

// DELETE
router.delete("/:id", checkId, (req, res) => {
  helpers
    .remove(req.params.id)
    .then(d => {
      res.status(201).json(d);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// PUT
router.put("/:id", checkId, (req, res) => {
  helpers
    .update(req.params.id, req.body)
    .then(u => {
      res.status(200).json(u);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// I think actions should go after projects, since they are kind of a sub-category and are associated with a single project

//GET all
router.get("/actions", (req, res) => {
  action_helpers
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// POST
router.post("/actions/", (req, res) => {
  if (req.body.project_id && req.body.description && req.body.notes) {
    action_helpers
      .insert(req.body)
      .then(a => {
        console.log(a);
        res.status(201).json(a);
      })
      .catch(err => {
        res.status(500).json({ err: err });
      });
  } else {
    res
      .status(404)
      .json({ message: "Missing a required field, you fucking nerd!" });
  }
});

// DELETE
router.delete("/actions/:actionId", checkId, (req, res) => {
  action_helpers
    .remove(req.params.actionId)
    .then(a => {
      res.status(201).json(a);
    })
    .catch(err => {
      res.status(500).json({ err: err });
    });
});

// UPDATE
router.put("/actions/:actionId", checkId, (req, res) => {
  action_helpers
    .update(req.params.actionId, req.body)
    .then(u => {
      res.status(201).json(u);
    })
    .catch(err => console.log(err));
});

module.exports = router;
