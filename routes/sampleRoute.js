const router = require('express').Router();

const { addSample, getAllSample, getSampleById, updateSample, deleteSample, bookSample, getAllBookSample, getBookSampleById, getBookSampleByUniqueId } = require('../controllers/sampleController');
const { AdminValidationToken } = require('../lib/validateToken/validate');


/**************************************************** SAMPLE BOOKING  ********************************************************** */

/**
 * book sample
*/
router.post('/booksample', bookSample);

/**
 * get all booksample
*/
router.get('/booksample', AdminValidationToken, getAllBookSample);

/**
 * get booksample by unique id
*/

router.get('/booksample/uniqueid/:id', AdminValidationToken, getBookSampleByUniqueId);

/**
 * get sample by id
*/

router.get('/booksample/:id', AdminValidationToken, getBookSampleById);



/**************************************************** SAMPLE GENERATION  ********************************************************** */


/**
 * Get sample
 */
router.get('/', getAllSample);
router.get('/:id', getSampleById);


/**
 * Add sample
 */
router.post('/', AdminValidationToken, addSample);

/**
 * Update sample
 */
router.put('/:id', AdminValidationToken, updateSample);

/**
 * Delete sample
 */
router.delete('/:id', AdminValidationToken, deleteSample);




module.exports = router;




