const adminregistration = require('./registration');
const emailVerificationModel = require('./verificationOtp');

const doctorModel = require('./doctor');
const sampleModel = require('./sample');

const booksampleModel = require('./booksample');
const bookdoctorModel = require('./bookdoctor');

const servicesModel = require('./services');
const subserviceModel = require('./subservice');




module.exports = {
    adminregistration,
    emailVerificationModel,

    doctorModel,
    sampleModel,

    booksampleModel,
    bookdoctorModel,

    servicesModel,
    subserviceModel
}

