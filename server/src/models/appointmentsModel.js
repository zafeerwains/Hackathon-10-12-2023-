const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        doctorName: String,
        patientName: String,
        appointmentTime: String
    },

    { collection: "appointments", versionKey: false }
);

const User = mongoose.model("appointments", appointmentsSchema);

module.exports = User;