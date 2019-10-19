const express = require('express');
const app = express();
const morgan= require('morgan');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');

const carsRoutes = require('./api/routes/cars');
const userRoutes= require('./api/routes/user');

mongoose.connect('mongodb+srv://Node-car-rent:'+process.env.MONGO_ATLAS_PW + '@node-car-rent-efjky.mongodb.net/car?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    'Access-Control-Allow-Headers',
    'Oirgin,X-Requested-With,Content-Type,Accept,Authorization'
    );
     if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
     }
    next();
});


app.use('/cars',carsRoutes);
app.use('/user',userRoutes);

app.use((req,res,next)=>{
    const error =new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
     res.json({
         error:{
            message:error.message
         }
     });
});

module.exports = app;