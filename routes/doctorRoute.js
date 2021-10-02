const router = require('express').Router();

const { addDoctor, deleteDoctor, getAllDoctor, updateDoctor, getDoctorById, revertDoctor } = require('../controllers/doctorController');
const { AdminValidationToken } = require('../lib/validateToken/validate');


/**
 * Get doctor
 */
router.get('/',AdminValidationToken,getAllDoctor);
router.get('/:id',AdminValidationToken,getDoctorById);

/**
 * Add doctor_route
 */
router.post('/',AdminValidationToken,addDoctor);

/**
 * Update doctor
 */
router.put('/:id',AdminValidationToken,updateDoctor);

/**
 * Delete doctor
 */
router.delete('/:id',AdminValidationToken,deleteDoctor);

/**
 * revert doctor
 */
 router.delete('/revert/:id',AdminValidationToken,revertDoctor);


/**************************************************** APPOINTMENT BOOKING  ********************************************************** */




module.exports = router;




