const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        _id: mongoose.Schema.ObjectId,
        name: String,
        contactDetails: Array,
        medicalHistory: Array,
    },

    { collection: "patients", versionKey: false }
);

const User = mongoose.model("patients", patientsSchema);

module.exports = User;