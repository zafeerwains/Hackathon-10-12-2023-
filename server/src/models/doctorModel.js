const mongoose = require("mongoose");

const doctorsSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        _id: mongoose.Schema.ObjectId,
        name: String,
        contactDetails: Object,
        schedule: Object,
        available: Boolean,
        specialization: String
    },

    { collection: "doctors", versionKey: false }
);

const User = mongoose.model("doctors", doctorsSchema);

module.exports = User;