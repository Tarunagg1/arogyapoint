const { sampleModel, booksampleModel } = require('../db');
const { errorHandler, genrateUniqueId } = require('../config/common');
var parse = require('date-fns/parse');
const multer = require('multer');
const path = require('path');

/**
 * Convert to iso Format
*/
const convertToIso = (mydate, time) => {
    const dd = parse(`${mydate} ${time}`, 'dd/MM/yyyy HH:mm:ss', new Date());
    return dd;
};


/**
 * Image 
*/

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/sample');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== ".img" && ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".pdf" && ext !== ".doc" && ext !== ".docx" && ext !== ".txt") {
            return callback(('Only img jpg and png pdf doc docx txt file are allowed'));
        }
        callback(null, true);
    },
}).array('image');


/**
 * Add sample
 */

const addSample = async (req, res) => {
    const { samplename, sampleprice } = req.body;
    if (!samplename || !sampleprice) {
        return res.status(400).json({ status: false, message: "samplename sampleprice are required" });
    }
    try {

        const newSample = new sampleModel({ samplename, sampleprice });
        const resp = await newSample.save();
        return res.status(200).json({ status: true, message: "Sample Added", resp })

    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * get all sample
 */


const getAllSample = async (req, res) => {
    try {
        const sampleData = await sampleModel.find({ isactive: true });
        return res.status(200).json({ status: true, message: "sample list", sampleData })
    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * delete all doctor
 */

const deleteSample = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ status: false, message: "sample id required" });
        }
        const resp = await sampleModel.findByIdAndDelete(id);
        return res.status(200).json({ status: true, message: "sample deleted", resp })
    } catch (error) {
        return errorHandler(error, res);
    }
}


/**
 * update sample
 */


const updateSample = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "sample id required" });
    }

    try {
        const resp = await sampleModel.findByIdAndUpdate(id, req.body, {
            new: true
        });

        return res.status(200).json({ status: true, message: "sample details updated", resp });

    } catch (error) {
        return errorHandler(error, res);
    }

}

/**
 * get doctor doctor
 */

const getSampleById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: false, message: "sample id required" });
    }
    try {
        const resp = await sampleModel.findById(id);
        return res.status(200).json({ status: true, message: "sample detail", resp });
    } catch (error) {
        return errorHandler(error, res);
    }
}



/********************************************  BOOKING SYSTEM ********************************************************** */

const bookSample = async (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host');

    try {
        upload(req, res, async (err) => {
            // console.log(err);
            if (err) {
                return errorHandler(err, res);
            }

            let file = null;

            let uniqueid = genrateUniqueId();

            let paymentmode = "unpaid";

            const { sampleid, samplename, patientname, bookdate, patientnumber, testfee } = req.body;
            if (!sampleid || !samplename || !patientname || !bookdate || !patientnumber || !testfee) {
                return res.status(400).json({ status: false, message: "sampleid,samplename,patientname,bookdate,patientnumber,testfee are required" });
            }

            // return
            // if (req.files.length <= 0) {
            //     return errorHandler({ message: "Please upload photoagain" }, res);
            // }

            if (req.files.length > 0) {
                file = req.files[0].filename;
            }

            const newSampleCase = new booksampleModel({ sampleid, uniqueid, samplename, bookdate, patientname, patientnumber, file, paymentmode, testfee });
            const resp = await newSampleCase.save();
            if (resp) {
                return res.status(200).json({ status: true, message: "Test booked agent visit at your home", resp })
            }
        })
    } catch (error) {
        logger.error(error);
        return errorHandler(error, res);
    }
}

const getAllBookSample = async (req, res) => {
    try {
        const sampleData = await booksampleModel.find();
        return res.status(200).json({ status: true, message: "sample list", sampleData })
    } catch (error) {
        return errorHandler(error, res);
    }
}


const getBookSampleById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: false, message: "sample id required" });
    }
    try {
        const resp = await booksampleModel.findById(id);
        return res.status(200).json({ status: true, message: "sample detail", resp });
    } catch (error) {
        return errorHandler(error, res);
    }
}




module.exports = {
    addSample,
    getAllSample,
    getSampleById,
    deleteSample,
    updateSample,
    bookSample,
    getAllBookSample,
    getBookSampleById
}
