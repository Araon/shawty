const express = require("express");
const router = express.Router();

const { tododb, userModel } = require("../../../models/todos");
const isLoggedIn = require("../../../middleware/auth");
const uuv4 = require("uuid").v4;

//getting all todos
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const todos = await tododb.find({ task_by: req.user.uid });
    res.send(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//creating a new todo
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const todo = new tododb({
      uid: uuv4(),
      // Change this line
      name: req.body.name,
      desc: {
        points: req.body.desc.points,
      },
      task_by: req.body.user,
      deadline: req.body.deadline,
      mood: req.body.mood,
      crit: req.body.crit,
      metadata: {
        image_url: req.body.metadata.image_url,
      },
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      updated_by: req.body.updated_by,
    });
    const result = await todo.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const todo = await tododb.findById(req.params.id);
    res.send(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/ids", isLoggedIn, async (req, res) => {
  try {
    const todos = await tododb.find({ uid: req.user.uid }).select("_id");
    res.send(
      todos.map((todo) => {
        return todo._id;
      })
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
