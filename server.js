const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

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

// Static
app.use(express.static(path.join(__dirname, "./client/build")));

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// Api router
app.use("/api", require("./routes/index"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
