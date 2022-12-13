// Importing all the libraries

const express = require('express');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const { request } = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/connectDB'); // importing the connectDB file to connect to the database

//importing all the router files

const doctorRouter = require('./routes/doctors-routes');
const doctorslistRouter = require('./routes/doctorslist-routes');
const signupRouter = require('./routes/signups-routers');
const patientRouter = require('./routes/patients-routes');
const loginRouter = require('./routes/login-router');
const getdetailsRouter = require('./routes/getdetails-router');
const bookappointmentRouter = require('./routes/bookappointment-router');
const updateprofileRouter = require('./routes/updateprofile-router');
const getappointmentsRouter = require("./routes/getappointments-router");
const updateMedicationRouter = require("./routes/updateMedication-router");

const refreshToken = require('./middleware/refreshtokenverify');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');


//initializing the app

const app = express();

connectDB(); // connecting to the database


// mongoose.connect('mongodb+srv://Sandeep:' + process.env.MONGO_ATLAS_PASSWORD + '@node-medicareapp.dpgqpzu.mongodb.net/MedicareData?retryWrites=true&w=majority', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });

app.use(credentials);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// following are the all API endpoints

app.use('/api/doctors', doctorRouter);

app.use('/api/patients', patientRouter);

app.use('/signup', signupRouter);

app.use('/login', loginRouter);

app.use('/getdetails', getdetailsRouter);

app.use('/bookappointment', bookappointmentRouter);
app.use('/getappointments', getappointmentsRouter);

app.use('/update', updateprofileRouter);
app.use('/updatemedication', updateMedicationRouter);

app.use('/refresh', refreshToken);

app.use('/', doctorslistRouter);

app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        error: {
            message: error.message
        }
    });
});


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(4000, () => console.log("Server Running on Port 4000"));
});

module.exports = app;