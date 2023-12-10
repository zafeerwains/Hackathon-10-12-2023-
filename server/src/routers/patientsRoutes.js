const express = require("express");
const router = express.Router();
const patients = require("../models/patientModel");
const mongoose = require("mongoose");

// Read patients data
router.get("/patients", async (req, res) => {
    const patientsData = await patients.find();
    res.json(patientsData);
});

// Read a specific patient data
router.get("/patients/:id", async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientData = await patients.findById(patientId);

        if (!patientData) {
            return res.status(404).json({ message: "patient not found!" });
        }
        res.status(200).json({ patientData: patientData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Create patient

router.post("/addpatient", async (req, res) => {
    try {
        const patientData = new patients({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            contactDetails: req.body.contactDetails,
            medicalHistory: req.body.medicalHistory,
        });
        const result = await patientData.save();
        res.json(result);
    } catch (error) {
        console.log("error : ", error);
        res.json({ error: "something went wrong!" });
    }
});

// delete patient
router.delete("/deletepatient/:id", async (req, res) => {
    try {
        console.log(req.params);
        const patientId = req.params.id;
        const deletedpatient = await patients.findByIdAndRemove(patientId);
        console.log("deletedpatient : ", deletedpatient);

        if (!deletedpatient) {
            return res.status(404).json({ message: "patient not found!" });
        }

        return res.json({ message: "patient deleted successfuly!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// UpdateData

router.put("/updatepatient/:id", async (req, res) => {
    try {
        const patientId = req.params.id;
        const dataToBeUpdate = new patients({
            email: req.body.email,
            name: req.body.name,
            contactDetails: req.body.contactDetails,
            medicalHistory: req.body.medicalHistory,
        });

        const updatedData = await patients.findByIdAndUpdate(patientId, dataToBeUpdate, {
            new: true,
        });
        console.log("updatedData : ", updatedData);

        if (!updatedData) {
            return res.status(404).json({ message: "patient not found!" });
        }

        return res.json({ message: "patient updated successfuly!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;