const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
let db;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

//data base Mongo
const uri = 'mongodb://amin:wakeUP.18@' +
    'cluster-v1-shard-00-00-nkxk5.azure.mongodb.net:27017,' +
    'cluster-v1-shard-00-01-nkxk5.azure.mongodb.net:27017,' +
    'cluster-v1-shard-00-02-nkxk5.azure.mongodb.net:27017/test?' +
    'ssl=true&replicaSet=Cluster-v1-shard-0&authSource=admin&retryWrites=true';
// Initialize connection once
MongoClient.connect(uri,{useNewUrlParser: true}, function(err, database) {
    if(err) throw err;

    db = database;

    // Start the application after the database connection is ready
    app.listen(3000);
    console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
    db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
        docs.each(function(err, doc) {
            if(doc) {
                console.log(doc);
            }
            else {
                res.end();
            }
        });
    });
});


module.exports = app;
