import mongoose from "mongoose";

const CronSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    url: {
        type: String,
    },
    cron: {
        type: String,
        required: true,
    },
    nextExecution: {
        type: Date,
    },
    isRunning: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    cooldown_period: {
        type: Number,
        default: 5,
    }
});

module.exports = mongoose.models.Cron ||  mongoose.model("Cron", CronSchema);
