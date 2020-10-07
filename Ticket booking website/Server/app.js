const express= require('express');
const app =express();
const morgan =require('morgan');
const bodyparser=require('body-parser');
const mongoose= require("mongoose");


// handle requests
const movieRoutes= require('./api/routes/Movies.js');
const userRoutes= require('./api/routes/User');
// connect mongo
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(
    'mongodb+srv://aashim:aashim@cinephilia-ldery.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser :true,
    useUnifiedTopology: true
}
);
//dor dev log
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// to allow route access
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/movies', movieRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) =>  {
    const error = new Error('Not Found');
    error.status= 404;
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message,
            name:"aashim"
        }
    });
    console.log(error);
});

module.exports= app; 
