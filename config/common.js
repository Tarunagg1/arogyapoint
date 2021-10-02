var uniqid = require('uniqid');


function errorHandler(err, res) {
    // logger.error(err);
    let { message } = err;
    return res.status(400).json({ error: { message: message, status: false } });
}

const genrateUniqueId = (slug='doc') => {
    const seq = (Math.floor(Math.random() * 10000000) + 999999999).toString();
    const id = slug+seq;
    return id;
}


module.exports = {
    errorHandler,
    genrateUniqueId
}

