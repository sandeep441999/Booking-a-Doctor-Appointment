const mongoose = require("mongoose");


//below is the Schema of a patient we use in databse

const patientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  medicalProblems: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  appointments: [
    {
      appointmentId: mongoose.Types.ObjectId,
      doctorName: { type: String },
      doctorId: mongoose.Types.ObjectId,
      doctorEmail: { type: String },
      medicalReasons: { type: String },
      MedicationsSuggested: { type: String },
      date: { type: Date },
      timeSlot: { type: String },
      completed: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
