const Meeting = require('../models/teammember');

// ดึงข้อมูลการประชุมทั้งหมด
exports.getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find().populate('staff_id');
        res.status(200).json(meetings);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.createMeeting = async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).json({ message: 'created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMeeting = async (req, res) => {
    try {
        await Meeting.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMeeting = async (req, res) => {
    try {
        await Meeting.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};