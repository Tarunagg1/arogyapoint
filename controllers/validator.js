const { errorHandler } = require('../config/common');
const { adminregistration } = require('../db');


const isAdminEmailExists = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return errorHandler({ message: "Email required" }, res);
    }
    try {
        const resp = await adminregistration.findOne({ email });
        if (resp) {
            return next();
        }
        return errorHandler({ message: "Email not exists" }, res);
    } catch (error) {
        return errorHandler(error, res);
    }
}



module.exports = {
    isAdminEmailExists
}










