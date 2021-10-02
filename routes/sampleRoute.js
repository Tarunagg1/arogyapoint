const router = require('express').Router();

const { addSample, getAllSample, getSampleById, updateSample, deleteSample, bookSample, getAllBookSample, getBookSampleById } = require('../controllers/sampleController');
const { AdminValidationToken } = require('../lib/validateToken/validate');


/**
 * Get sample
 */
router.get('/', AdminValidationToken, getAllSample);
router.get('/:id', AdminValidationToken, getSampleById);

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


/**************************************************** SAMPLE BOOKING  ********************************************************** */

/**
 * book sample
*/
router.post('/booksample', bookSample);

/**
 * get all booksample
*/
router.get('/booksample', getAllBookSample);


/**
 * get sample by id
*/

router.get('/booksample/:id', getBookSampleById);



module.exports = router;




