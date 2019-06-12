const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const users = require("./Server/routes/api/users");
const auth = require("./Server/routes/api/auth");



const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(__dirname + "/grobbike"));

app.use(bodyParser.json());
// DB Config
const db = require("./Server/config/keys").mongoURI;
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


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./Server/config/passport")(passport);
// Routes
app.use("/api/users", require("./Server/routes/api/users")); 
app.use("/api/auth", require("./Server/routes/api/auth")); 



app.use(express.static(__dirname + "/grobbike"));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'grobbike', 'build', 'index.js'));
  });

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));