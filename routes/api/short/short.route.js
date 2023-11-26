const express = require("express");
const router = express.Router();

const { shortdb } = require("../../../models/short");
const uuv4 = require("uuid").v4;

//getting all todos
router.get("/", async (req, res) => {
    try {
        const todos = await shortdb.find({ task_by: req.user.uid });
        res.send(todos);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const todo = await shortdb.findById(req.params.id);
        res.send(todo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//creating a new todo
router.post("/", async (req, res) => {
    try {
        const todo = new shortdb({
            uid: uuv4(),
            longUrl: req.body.url
        });
        const result = await todo.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
