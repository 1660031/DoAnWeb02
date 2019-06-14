const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const users = require("./Server/routes/api/users");
const auth = require("./Server/routes/api/auth");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use('/users', router);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// DB Config
const db = require(".Server/config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
    useCreateIndex:true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  mongoose.Promise = global.Promise;
  app.use(function(req, res, next) {
    next(createError(404));
  });
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  // Passport middleware
app.use(passport.initialize());
// Passport config
require(".Server/config/passport")(passport);
// Routes
app.use("/api/users", require(".Server/routes/api/users")); 
app.use("/api/auth", require(".Server/routes/api/auth")); 



app.use(express.static(__dirname + "/grobbike"));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'grobbike', 'build', 'index.js'));
  });
  
  io.on('connection',(socket)=>{
    console.log("cc");
    socket.on('client_send_pos',(data)=>{
      arr_pos.push(data);
      console.log(data);
      console.log(arr_pos);
    })
  })

  
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));