const router = require('express').Router();
const adminRoute = require('./adminRoute');
const doctorRoute = require('./doctorRoute');
const sampleRoute = require('./sampleRoute');


router.use('/admin', adminRoute);
router.use('/doctor', doctorRoute);
router.use('/sample', sampleRoute);


module.exports = router;








