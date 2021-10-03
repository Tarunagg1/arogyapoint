const { doctorModel, bookdoctorModel } = require('../db')
const { errorHandler, genrateUniqueId } = require('../config/common')


/********************************************  ADDING DOCTOR SYSTEM ********************************************************** */

/**
 * Add doctor
 */

const addDoctor = async (req, res) => {
    const { dname, demail, dnumber, fees } = req.body;
    if (!dname || !demail || !dnumber || !fees) {
        return res.status(400).json({ status: false, message: "Doctor dname demail dnumber fees fields required" });
    }
    try {
        const isdoctoremailExixt = await doctorModel.findOne({ demail });
        const isdoctornumberExixt = await doctorModel.findOne({ dnumber });

        if (isdoctoremailExixt) {
            return res.status(400).json({ status: false, message: "Doctor email allready exists" });
        } else if (isdoctornumberExixt) {
            return res.status(400).json({ status: false, message: "Doctor number allready exists" });
        }

        const newDoctor = new doctorModel({ dname, demail, dnumber, fees });

        const resp = await newDoctor.save();
        return res.status(200).json({ status: true, message: "Registration successfull", newdoctor: resp })

    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * get all doctor
 */


const getAllDoctor = async (req, res) => {
    try {
        console.log('kii');
        const doctordata = await doctorModel.find({ isactive: true, isdeleted: false });
        return res.status(200).json({ status: true, message: "Doctor list", doctordata })
    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * get all doctor
 */


const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ status: false, message: "doctor id required" });
        }
        const resp = await doctorModel.findByIdAndUpdate(id, { isdeleted: true }, {
            new: true
        });
        return res.status(200).json({ status: true, message: "Doctor deleted", doctordata: resp })
    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * revert doctor
 */


const revertDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ status: false, message: "doctor id required" });
        }

        const resp = await doctorModel.findByIdAndUpdate(id, { isdeleted: false }, {
            new: true
        });

        return res.status(200).json({ status: true, message: "Doctor details updated", updatedoctor: resp });

    } catch (error) {
        return errorHandler(error, res);
    }
}

/**
 * update doctor
 */


const updateDoctor = async (req, res) => {

    if (req.body.demail || req.body.dnumber) {
        return res.status(400).json({ status: false, message: "you can't update doctor email or number" });
    }

    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ status: false, message: "doctor id required" });
    }

    try {
        const resp = await doctorModel.findByIdAndUpdate(id, req.body, {
            new: true
        });

        return res.status(200).json({ status: true, message: "Doctor details updated", updatedoctor: resp });

    } catch (error) {
        return errorHandler(error, res);
    }

}


/**
 * get doctor doctor
 */

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: false, message: "doctor id required" });
    }
    try {
        const doctor = await doctorModel.findById(id);
        return res.status(200).json({ status: true, message: "sample detail", doctor });
    } catch (error) {
        return errorHandler(error, res);
    }
}

/********************************************  BOOKING SYSTEM ********************************************************** */

const bookDoctor = async (req, res) => {
    try {
        let uniqueid = genrateUniqueId("DOC");

        const { doctorid, pname, pemail, pnumber, paymentmode, appointmentdate } = req.body;
        if (!doctorid || !pname || !pemail || !pnumber || !paymentmode || !appointmentdate) {
            return res.status(400).json({ status: false, message: " doctorid, pname, pemail, pnumber, paymentmode, appointmentdate are required" });
        }
        const doctorData = await doctorModel.findById(doctorid);
        if (!doctorData) {
            return res.status(400).json({ status: false, message: "doctor id not exists" });
        }
        const { dname, demail, dnumber, fees } = doctorData;

        const newDoctorBook = new bookdoctorModel({ doctorid, uniqueid, pname, pemail, pnumber, dname, demail, dnumber, paymentmode, appointmentdate, doctorfee: fees });
        const resp = await newDoctorBook.save();
        return res.status(200).json({ status: true, message: "your Appointment book with doctor successfully", resp });

    } catch (error) {
        return errorHandler(error, res);
    }
}

const getAllBookDoctor = async (req, res) => {
    try {
        let { from } = req.query;

        if (from === undefined) {
            var start = new Date();
            start.setHours(0, 0, 0, 0);
            var end = new Date();
            end.setHours(23, 59, 59, 999);
        } else {
            var start = new Date(from);
            var end = new Date(from);
            end.setHours(23, 59, 59, 999);
        }

        const resp = await bookdoctorModel.find({ appointmentdate: { "$gte": start, "$lt": end } });
        return res.status(200).json({ status: true, message: "appointment list", resp })
    } catch (error) {
        console.log(error);
        return errorHandler(error, res);
    }
}
const getBookDoctorById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: false, message: "appointment id required" });
    }
    try {
        const resp = await bookdoctorModel.findById(id);
        return res.status(200).json({ status: true, message: "appointment detail", resp });
    } catch (error) {
        return errorHandler(error, res);
    }
}

const getBookDoctorByUniqueId = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ status: false, message: "appointment id required" });
    }
    try {
        const resp = await bookdoctorModel.findOne({ uniqueid: id });
        return res.status(200).json({ status: true, message: "appointment detail", resp });
    } catch (error) {
        return errorHandler(error, res);
    }
}



module.exports = {
    addDoctor,
    getAllDoctor,
    deleteDoctor,
    revertDoctor,
    updateDoctor,
    getDoctorById,

    bookDoctor,
    getAllBookDoctor,
    getBookDoctorByUniqueId,
    getBookDoctorById,
}
