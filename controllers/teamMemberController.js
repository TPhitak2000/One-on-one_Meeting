const TeamMember = require('../models/TeamMember');

// ดึงข้อมูลสมาชิกทั้งหมด
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find(); // เพิ่มเงื่อนไขที่ต้องการถ้าจำเป็น เช่น manager_id
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// เพิ่มสมาชิกใหม่
exports.addTeamMember = async (req, res) => {
  try {
    const teamMember = new TeamMember(req.body);
    await teamMember.save();
    res.status(201).json({ message: 'Team member added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};