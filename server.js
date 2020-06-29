const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const { networkInterfaces } = require("os");
const { nextTick } = require("process");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Passport config
require("./config/passport")(passport);

// Bodyparser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect To Mongodb
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Cors
app.use(cors());

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Api router
app.use("/api", require("./routes/index"));
// User router
app.use("/api", require("./routes/users"));

// Static
app.use(express.static(path.join(__dirname, "./client/build")));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
