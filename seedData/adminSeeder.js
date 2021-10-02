const { adminregistration} = require('../db')





const data = [
    {
        name:"tarun",
        email:"arunaggarwal096@gmail.com"
    }
]

const importAdminSeeder = async ()=>{
    try {
        await adminregistration.create(data);
    } catch (error) {
    }
}

module.exports = {
    importAdminSeeder
}


