// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting'); 
const {
  getAllMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting
} = require('../controllers/meetingController.js');

// ฟังก์ชันสำหรับการจอง
const getAllBookings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBooking = async (req, res) => {
  const { manager_id, slot, duration, staff_id } = req.body;

  try {
    const newMeeting = new Meeting({
      manager_id,
      slot,
      duration,
      staff_id,
    });
    const savedMeeting = await newMeeting.save();
    res.status(201).json({ message: 'created', meeting: savedMeeting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.meeting_id, req.body, { new: true });
    res.status(200).json({ message: 'updated', meeting: updatedMeeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.meeting_id);
    res.status(200).json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// เส้นทางสำหรับการจอง
router.get('/', getAllBookings);  // ดึงข้อมูลการจองทั้งหมด
router.post('/', createBooking);  // สร้างการจองใหม่
router.put('/:meeting_id', updateBooking);  // อัปเดตการจอง
router.delete('/:meeting_id', deleteBooking);  // ลบการจอง

// เส้นทางการประชุม
router.get('/', getAllMeetings);
router.post('/', createMeeting);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

module.exports = router;
