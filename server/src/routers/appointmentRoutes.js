const express = require("express");
const router = express.Router();
const appointments = require("../models/appointmentsModel");
const mongoose = require("mongoose");

// Read appointments data
router.get("/appointments", async (req, res) => {
  const appointmentsData = await appointments.find();
  res.json(appointmentsData);
});

// Read a specific appointment data
router.get("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointmentData = await appointments.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ message: "appointment not found!" });
    }
    res.status(200).json({ appointmentData: appointmentData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create appointment

router.post("/addappointment", async (req, res) => {
  try {
    const appointmentData = new appointments({
      _id: new mongoose.Types.ObjectId(),
      doctorName: req.body.doctorName,
      patientName: req.body.patientName,
      appointmentTime: req.body.appointmentTime
    });
    const result = await appointmentData.save();
    res.json(result);
  } catch (error) {
    console.log("error : ", error);
    res.json({ error: "something went wrong!" });
  }
});

// delete appointment
router.delete("/deleteappointment/:id", async (req, res) => {
  try {
    console.log(req.params);
    const appointmentId = req.params.id;
    const deletedappointment = await appointments.findByIdAndRemove(appointmentId);
    console.log("deletedappointment : ", deletedappointment);

    if (!deletedappointment) {
      return res.status(404).json({ message: "appointment not found!" });
    }

    return res.json({ message: "appointment deleted successfuly!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// UpdateData

router.put("/updateappointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const dataToBeUpdate = new appointments({
      doctorName: req.body.doctorName,
      patientName: req.body.patientName,
      appointmentTime: req.body.appointmentTime
    });

    const updatedData = await appointments.findByIdAndUpdate(appointmentId, dataToBeUpdate, {
      new: true,
    });
    console.log("updatedData : ", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "appointment not found!" });
    }

    return res.json({ message: "appointment updated successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;