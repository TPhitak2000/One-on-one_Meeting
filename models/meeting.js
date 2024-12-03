const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  manager_id: { type: String, required: true },
  slot: { type: Date, required: true },
  duration: { type: Number, required: true },
  staff_id: { type: String, required: true },
});

// ป้องกันการคอมไพล์ซ้ำ
const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
