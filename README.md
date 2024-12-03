<!-- 1. ไฟล์ server.js
หน้าที่:
ไฟล์นี้คือจุดเริ่มต้นของเซิร์ฟเวอร์ Node.js ซึ่งใช้ Express เป็นเฟรมเวิร์ก

การทำงาน:
โหลดโมดูลและตั้งค่าเริ่มต้น

javascript
คัดลอกโค้ด
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database.js');
dotenv.config();
dotenv: ใช้เพื่อโหลดตัวแปรลับ (เช่น URL ของ MongoDB) จากไฟล์ .env
cors: เปิดให้เซิร์ฟเวอร์ยอมรับการเชื่อมต่อจากโดเมนอื่น
bodyParser: แปลงข้อมูลใน req.body ให้อยู่ในรูปแบบ JSON
เชื่อมต่อกับฐานข้อมูล

javascript
คัดลอกโค้ด
connectDB();
ฟังก์ชัน connectDB ทำหน้าที่เชื่อมต่อกับ MongoDB โดยดึงค่า MONGO_URI จากไฟล์ .env

กำหนด Middleware และเส้นทาง

javascript
คัดลอกโค้ด
app.use(cors());
app.use(bodyParser.json());
app.use('/api/team-members', require('./routes/teamMemberRoutes.js'));
app.use('/api/book', require('./routes/meetingRoutes.js'));
ใช้ cors เพื่อเปิดการเชื่อมต่อจากโดเมนต่าง ๆ
ใช้ bodyParser เพื่อให้เซิร์ฟเวอร์อ่านข้อมูล JSON ที่ถูกส่งมา
กำหนดเส้นทาง API หลัก
/api/team-members: สำหรับจัดการข้อมูลสมาชิกทีม
/api/book: สำหรับจัดการข้อมูลการจอง
เริ่มเซิร์ฟเวอร์

javascript
คัดลอกโค้ด
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌐✅`));
เซิร์ฟเวอร์จะรันอยู่ที่พอร์ตที่กำหนดในไฟล์ .env หรือพอร์ต 5000 โดยเริ่มทำงานพร้อมแสดงข้อความในคอนโซล

2. ไฟล์ meetingRoutes.js
หน้าที่:
กำหนดเส้นทาง (routes) และเชื่อมโยงกับฟังก์ชันควบคุม (controllers) สำหรับการประชุมและการจอง

การทำงาน:
ฟังก์ชันควบคุมการจอง

javascript
คัดลอกโค้ด
const getAllBookings = async (req, res) => { ... };
const createBooking = async (req, res) => { ... };
const updateBooking = async (req, res) => { ... };
const deleteBooking = async (req, res) => { ... };
ใช้ Meeting (โมเดลของ MongoDB) ในการดึงข้อมูล, สร้าง, อัปเดต, และลบข้อมูล
ทุกฟังก์ชันถูกเขียนในรูปแบบ async/await เพื่อจัดการกับกระบวนการที่เกิดขึ้นแบบไม่พร้อมกัน (asynchronous)
กำหนดเส้นทาง

javascript
คัดลอกโค้ด
router.get('/', getAllBookings);
router.post('/', createBooking);
router.put('/:meeting_id', updateBooking);
router.delete('/:meeting_id', deleteBooking);
กำหนดเส้นทาง API:
GET /api/book: ดึงข้อมูลการจองทั้งหมด
POST /api/book: สร้างการจองใหม่
PUT /api/book/:meeting_id: อัปเดตการจองโดยระบุ ID
DELETE /api/book/:meeting_id: ลบการจองโดยระบุ ID
3. ไฟล์ meeting.js
หน้าที่:
โมเดลที่ใช้กำหนดโครงสร้างของข้อมูลการจองใน MongoDB

การทำงาน:
สร้าง Schema

javascript
คัดลอกโค้ด
const meetingSchema = new mongoose.Schema({
    manager_id: { type: String, required: true },
    slot: { type: Date, required: true },
    duration: { type: Number, required: true },
    staff_id: { type: String, required: true },
});
ใช้ mongoose.Schema เพื่อกำหนดโครงสร้างของข้อมูลที่บันทึกใน MongoDB
manager_id: รหัสผู้จัดการ
slot: วันและเวลาที่จอง
duration: ระยะเวลา (นาที)
staff_id: รหัสพนักงานที่เกี่ยวข้อง
สร้างโมเดล

javascript
คัดลอกโค้ด
const Meeting = mongoose.model('Meeting', meetingSchema);
สร้างโมเดลชื่อ Meeting จาก meetingSchema เพื่อให้สามารถใช้โมเดลนี้ดึงข้อมูล, เพิ่ม, แก้ไข, หรือลบข้อมูลใน MongoDB
4. กระบวนการคิดในการสร้าง
แยกส่วน:

แยกความรับผิดชอบของแต่ละไฟล์: เซิร์ฟเวอร์ (server.js), เส้นทาง (routes), และโมเดล (models)
การแบ่งส่วนช่วยให้โค้ดอ่านง่ายและแก้ไขได้สะดวก
โครงสร้าง MVC:
ใช้รูปแบบ Model-View-Controller (MVC)

Model: โครงสร้างข้อมูลใน MongoDB
Controller: ฟังก์ชันจัดการคำขอ (HTTP requests)
View: ไม่จำเป็นใน API (ตอบกลับด้วย JSON)
การรองรับข้อผิดพลาด:
มีการใช้ try-catch เพื่อจัดการข้อผิดพลาดในทุกฟังก์ชัน

ปรับขนาดได้ง่าย:
สามารถเพิ่มฟีเจอร์ใหม่ได้ง่าย โดยการเพิ่มเส้นทางใหม่หรือโมเดลใหม่ -->

