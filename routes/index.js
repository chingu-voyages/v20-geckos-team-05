const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json({ appointments });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.json({ appointment });
  } catch (error) {
    res.json({ error });
  }
});

// Add an appointment
router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      begins: req.body.begins,
      ends: req.body.ends,
      people: req.body.people,
      location: req.body.location,
      description: req.body.description,
      userId: req.body.userId,
    });
    res.json({ appointment });
  } catch (error) {
    res.json({ error });
  }
});

// Edit an appointment
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    appointment.title = req.body.title || appointment.title;
    appointment.startDate = req.body.startDate || appointment.startDate;
    appointment.endDate = req.body.endDate || appointment.endDate;
    appointment.begins = req.body.begins || appointment.begins;
    appointment.ends = req.body.ends || appointment.ends;
    appointment.people = req.body.people || appointment.people;
    appointment.location = req.body.location || appointment.location;
    appointment.description = req.body.description || appointment.description;
    await appointment.save();
    res.status(200).json({ appointment });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// Delete an appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findOneAndDelete({ _id: req.params.id });
    res.status(204).end();
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
