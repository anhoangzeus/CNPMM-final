const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    userId: { type: String, required: true}
})
todoSchema.plugin(mongoosePaginate);
module.exports = Todo = mongoose.model("todo", todoSchema);