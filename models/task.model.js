const mongoose = require("mongoose");
const {Schema} = mongoose;
const taskSchema = new Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
})

module.exports = mongoose.model("task",taskSchema,"tasks");