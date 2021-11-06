require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const { errorHandler } = require("./middleware/error");
//const { render } = require('ejs');
const app = express();

const dbURI = process.env.DB_URI;
// connect to mongodb
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(process.env.PORT || 3000, function () {
      console.log(`Hello to 3000`);
    })
  )
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(errorHandler);
//routes

app.get("/", (req, res) => {
  console.log("hey");
  res.redirect("/blogs");
});
app.get("/sysinfo", async (req, res) => {
  const si = require("systeminformation");

  // promises style - new since version 3
  await si
    .cpu()
    .then((data) => console.log(data.flags, data.vendor))
    .catch((error) => console.error(error));

  return res.json("done");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
