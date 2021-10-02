const { errorHandler } = require("../../config/common");
const { emailVerificationModel } = require("../../db");
const { commonMailFunctionToAll } = require("../../lib/mailer");


function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

var dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp) 
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
      d.constructor === Date ? d :
        d.constructor === Array ? new Date(d[0], d[1], d[2]) :
          d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
              typeof d === "object" ? new Date(d.year, d.month, d.date) :
                NaN
    );
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    return (
      isFinite(a = this.convert(a).valueOf()) &&
        isFinite(b = this.convert(b).valueOf()) ?
        (a > b) - (a < b) :
        NaN
    );
  }
}

const sendMailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorHandler({ message: "Please provide email" }, res);
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 15);

    let otp = Math.floor(Math.random() * (100000 - 100000 + 999999)) + 100000;
    const isAllready = await emailVerificationModel.findOne({ identity: email });
    let emaildata = {
      content: `to email verification Portal. Use the following OTP to complete your Login procedures. OTP is valid for 15 minutes`,
      subject: "Email Verification",
      email,
      otp
    }
    if (isAllready) {
      const isonupdated = await emailVerificationModel.findByIdAndUpdate(isAllready._id, { otp, expiration_time });
      if (isonupdated) {
        await commonMailFunctionToAll(emaildata, "otp");
        return next();
      }
    } else {
      const dataresp = new emailVerificationModel({ identity: email, otp, expiration_time });
      const drespsave = await dataresp.save();

      if (drespsave) {
        await commonMailFunctionToAll(emaildata, "otp");
        return next();
      }
    }
  } catch (error) {
    return errorHandler({ message: "Unable to send message" }, res);
  }
}


const verifyMailOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return errorHandler({ message: "Please provide email" }, res);
    }
    if (!otp) {
      return errorHandler({ message: "otp required" }, res);
    } else if (otp.length !== 6) {
      return errorHandler({ message: "it should be 6 characters long" }, res);
    }

    var currentdate = new Date();

    const isAllready = await emailVerificationModel.findOne({ identity: email });

    if (isAllready) {
      if (isAllready.otp === otp) {
        if (dates.compare(isAllready.expiration_time, currentdate) == 1) {
          await emailVerificationModel.findByIdAndDelete(isAllready._id);
          return next();
        } else {
          return errorHandler({ message: "Otp expire" }, res);
        }
      } else {
        return errorHandler({ message: "Invalid otp" }, res);
      }
    } else {
      return errorHandler({ message: "Invalid Email or expire" }, res);
    }
  } catch (error) {
    return errorHandler({ message: "Something went wrong" }, res);
  }
}



module.exports = {
  sendMailOtp,
  verifyMailOtp
}