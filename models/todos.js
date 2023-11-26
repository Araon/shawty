const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mooody", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("ERROR:", err.message);
    });

// todoschema
const todoSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        points: {
            type: [String],
        },
    },
    task_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    deadline: {
        type: Date,
        required: false,
    },
    mood: {
        type: String,
        required: true,
    },
    crit: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        required: true,
    },
    metadata: {
        image_url: {
            type: String,
        },
    },
    created_at: {
        type: String,
        default: Date.now,
        required: true,
    },
    last_updated: {
        type: String,
        default: Date.now,
        required: true,
    },
    updated_by: {
        type: String,
        required: true,
        defualt: "System",
    },
});

const tododb = mongoose.model("todos", todoSchema);

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = { tododb, userModel };
