const { adminLogin, adminVerify } = require('../controllers/adminController');
const { isAdminEmailExists } = require('../controllers/validator');
const { sendMailOtp, verifyMailOtp} = require('../lib/mail-otp-service/controller');

const router = require('express').Router();

router.post('/login',isAdminEmailExists,sendMailOtp,adminLogin);

router.post('/verify',isAdminEmailExists,verifyMailOtp,adminVerify);



module.exports = router;




