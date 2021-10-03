const router = require('express').Router();
const adminRoute = require('./adminRoute');
const doctorRoute = require('./doctorRoute');
const sampleRoute = require('./sampleRoute');
const serviceRoute = require('./serviceRoute');


router.use('/admin', adminRoute);
router.use('/doctor', doctorRoute);
router.use('/sample', sampleRoute);
router.use('/service', serviceRoute);


module.exports = router;








