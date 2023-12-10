const express = require("express");
const router = express.Router();
const doctors = require("../models/doctorModel");
const mongoose = require("mongoose");

// Read doctors data
router.get("/doctors", async (req, res) => {
    const doctorsData = await doctors.find();
    res.json(doctorsData);
});

// Read a specific doctor data
router.get("/:id", async (req, res) => {
    try {
        // const doctorId = req.params.id;
        const doctorData = await doctors.findOne({ email: req.body.email });

        if (!doctorData) {
            return res.status(404).json({ message: "doctor not found!" });
        }
        res.status(200).json({ doctorData: doctorData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Create doctor

router.post("/adddoctor", async (req, res) => {
    try {
        const doctorData = new doctors({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            contactDetails: req.body.contactDetails,
            schedule: req.body.schedule,
            available: req.body.available,
            specialization: req.body.specialization
        });
        const result = await doctorData.save();
        res.json(result);
    } catch (error) {
        console.log("error : ", error);
        res.json({ error: "something went wrong!" });
    }
});

// delete doctor
router.delete("/deletedoctor/:id", async (req, res) => {
    try {
        console.log(req.params);
        const doctorId = req.params.id;
        const deleteddoctor = await doctors.findByIdAndRemove(doctorId);
        console.log("deleteddoctor : ", deleteddoctor);

        if (!deleteddoctor) {
            return res.status(404).json({ message: "doctor not found!" });
        }

        return res.json({ message: "doctor deleted successfuly!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// UpdateData

router.put("/updatedoctor/:id", async (req, res) => {
    try {
        const doctorId = req.params.id;
        const dataToBeUpdate = new doctors({
            email: req.body.email,
            name: req.body.name,
            contactDetails: req.body.contactDetails,
            schedule: req.body.schedule,
            available: req.body.available,
            specialization: req.body.specialization
        });

        const updatedData = await doctors.findByIdAndUpdate(doctorId, dataToBeUpdate, {
            new: true,
        });
        console.log("updatedData : ", updatedData);

        if (!updatedData) {
            return res.status(404).json({ message: "doctor not found!" });
        }

        return res.json({ message: "doctor updated successfuly!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;