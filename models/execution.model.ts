import mongoose from "mongoose";

const ExecutionSchema = new mongoose.Schema({
    cron: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cron",
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["success", "error", "running"],
    },
    message:{
        type: String,
    }
});

module.exports = mongoose.models.Execution ||  mongoose.model("Execution", ExecutionSchema);