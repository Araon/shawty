const todoModel = require("../models/todos")


class ProfileController {
    async fetchProfile( requestData) {
        console.log("Profile data")

        const todo = await todoModel.findAll();
        return todo
    }
}

module.exports = new ProfileController();