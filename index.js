require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('./config/db');
const mainRouter = require('./routes');
const { importAdminSeeder } = require('./seedData/adminSeeder');

const app = express();

// using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'))
app.use(helmet());

app.use(cors({
    origin: '*'
}))

// main route
app.use('/api/v1/',mainRouter)

const PORT = process.env.PORT || 5555;  


// applying seeders
importAdminSeeder()


// listning app
app.listen(PORT,()=>{
    console.log('Server listning at',PORT);
})
