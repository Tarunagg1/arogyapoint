const { sampleModel } = require('../db')
const { errorHandler } = require('../config/common')

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
        return res.status(200).json({ status: true, message: "Doctor list", sampleData })
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
        return res.status(200).json({ status: true, message: "Doctor deleted", resp })
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
        return res.status(400).json({ status: false, message: "doctor id required" });
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
        return res.status(400).json({ status: false, message: "doctor id required" });
    }
    try {
        const resp = await sampleModel.findById(id);
        return res.status(200).json({ status: true, message: "sample detail", resp });
    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = {
    addSample,
    getAllSample,
    deleteSample,
    updateSample,
    getSampleById
}
