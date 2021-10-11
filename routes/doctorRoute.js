const router = require('express').Router();

const { addDoctor, deleteDoctor, getAllDoctor, updateDoctor, getDoctorById, revertDoctor, bookDoctor, getAllBookDoctor, getBookDoctorById, getBookDoctorByUniqueId } = require('../controllers/doctorController');
const { AdminValidationToken } = require('../lib/validateToken/validate');

/**************************************************** APPOINTMENT BOOKING  ********************************************************** */

/**
 * Get Book doctor
*/
router.get('/bookdoctor',AdminValidationToken,getAllBookDoctor);
router.get('/bookdoctor/:id',AdminValidationToken,getBookDoctorById);
router.get('/bookdoctor/unique/:id',AdminValidationToken,getBookDoctorByUniqueId);

/**
 * Book doctor
*/

router.post('/bookdoctor',bookDoctor);

/**************************************************** ADD DOCTOR  ********************************************************** */


/**
 * Get doctor
 */
router.get('/',getAllDoctor);
router.get('/:id',getDoctorById);

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
 router.put('/revert/:id',AdminValidationToken,revertDoctor);



module.exports = router;




