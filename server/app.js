require('dotenv').config()
const cors = require('cors')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const app = express();
app.use(cors())


//set MONGOURI
let database = process.env.DATABASE_DEV
if (process.env.NODE_ENV == 'test') {
    database = process.env.DATABASE_TEST
} else if (process.env.NODE_ENV == 'prod') {
    database = process.env.DATABASE_PROD
}

mongoose.connect(database, { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function(){
    console.log(`Database in connect ${process.env.NODE_ENV}`);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions')
const commentsRouter = require('./routes/comments')


app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/comments', commentsRouter);
// catch 404 and forward to error handler 


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;