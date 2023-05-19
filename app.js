import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoConnection from "./config/config.js";
import fileUpload from 'express-fileupload';


const app = express();

// DB CONNECTION 
mongoConnection();

// REQUIRING ROUTES FOLDER FILE TO DEFINE ROUTES
import usersRoute from './routes/usersRoutes.js';
import dailySessionRoute from './routes/userDailySessionRoutes.js';
import vehicleInfoRoute from './routes/vehicleInfoRoute.js';
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));


//CREATING ROUTE
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
export default app;
