const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_KEY,{useNewUrlParser:true})
.then(()=>{
    console.log("connection establish successfully")
}).catch((err)=>{
    console.log('Mongo connection error:', err);
})
