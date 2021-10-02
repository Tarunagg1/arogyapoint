'use strict';

const { genrateOtp, verifyOtp } = require('./controller');
const { validPhoneNumber, validMailId } = require('../doctor-service/validator');
const { sendMailOtp, verifyMailOtp } = require('./controller');

const router = require('express').Router();

/**
 *  doctor routes
*/
router.post('/sendotp/email',sendMailOtp);
router.post('/verifyotp/email',verifyMailOtp);

router.post('/sendotp/register/email',validMailId,sendMailOtp);
router.post('/verifyotp/register/email',validMailId,verifyMailOtp);


router.post('/sendotp/number',genrateOtp);
router.post('/verifyotp/number',verifyOtp);

router.post('/sendotp/register/number',validPhoneNumber,genrateOtp);
router.post('/verifyotp/register/number',validPhoneNumber,verifyOtp);


module.exports = router;