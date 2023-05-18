const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoConnection = require("./config/config");
const fileUpload = require('express-fileupload');


const app = express();

// DB CONNECTION 
mongoConnection();

// 
const usersRoute = require('./routes/usersRoutes');
const dailySessionRoute = require('./routes/userDailySessionRoutes');
const vehicleInfoRoute = require('./routes/vehicleInfoRoute');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));



app.use('/api/auth/', usersRoute);
app.use('/api/session/', dailySessionRoute);
app.use('/api/vehicleinfo/', vehicleInfoRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  
});
app.listen(3000,()=>{
  console.log("runnig on 3000");
})
module.exports = app;
