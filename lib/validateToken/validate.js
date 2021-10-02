const jwt = require('jsonwebtoken');
const { adminregistration } = require('../../db');

exports.AdminValidationToken = async (req, res, next) => {
    try {
        const t = req.headers.authorization;
        if (t !== undefined) {
            const token = req.headers.authorization.split(" ")[1];

            const doctorInfo = await jwt.verify(token, process.env.LOGIN_SECRET);

            if (!doctorInfo || !token) {
                return res.status(401).json({ errors: [{ message: "Invalid Token", status: false }] });
            }

            const isuserexist = await adminregistration.findById(doctorInfo._id);

            if (isuserexist) {
                req.user = doctorInfo;
                next();
            } else {
                return res.status(401).json({ errors: [{ message: "Logout and Login again", status: false, errs: error }] });
            }
        } else {
            return res.status(401).json({ errors: [{ message: "Token not provided", status: false }] });
        }
    } catch (error) {
        // console.log(error);
        return res.status(401).json({ errors: [{ message: "Token is expire or invalid", status: false, errs: error }] });
    }
};

