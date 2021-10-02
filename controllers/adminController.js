const { adminregistration } = require('../db');
const jwt = require('jsonwebtoken')


// auth
const adminLogin = async (req, res) => {
    return res.status(200).json({ message: "Otp send successfully", status: true });
}


const adminVerify = async (req, res) => {
    const { email } = req.body;
    try {
        const userExist = await adminregistration.findOne({ email });
        if (userExist) {
            const { _id, email } = userExist;

            const token = jwt.sign({ _id, email }, process.env.LOGIN_SECRET, { expiresIn: '7d' });

            return res.status(200).json({ message: "Login success", authToken: token, status: true });
        } else {
            return res.status(400).json({ status: false, message: "Something went wrong try again" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong', status: false, error })
    }
}


// promocode

const addPromoCode = (req,res) => {}
const getAllPromoCode = (req,res) => {}
const isValidatePromoCode = (req,res) => {}
const deletePromoCode = (req,res) => {}





module.exports = {
    adminLogin,
    adminVerify,
    adminregistration
}




