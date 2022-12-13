const mongoose = require("mongoose");

//below is the Schema of an appointment we use in databse

const appointmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, required: true },
  medicalIssues: { type: String, required: true },
  medicationsSuggested: { type: String },
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String },
  completed: { type: Boolean, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorEmail: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
