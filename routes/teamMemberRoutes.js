const express = require('express');
const router = express.Router();
const {
  getAllTeamMembers,
  addTeamMember,
} = require('../controllers/teamMemberController.js');

// ดึงข้อมูลสมาชิกทั้งหมด
router.get('/:manager_id', getAllTeamMembers);

// เพิ่มสมาชิกใหม่ (ถ้าต้องการในอนาคต)
router.post('/', addTeamMember);

module.exports = router;