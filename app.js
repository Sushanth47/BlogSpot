require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
const blogRoutes = require("./routes/blogRoutes");
const home = require("./routes/home");
const app = express();

const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT || 3000, async function () {
      console.log(`Hello to 3000`);
    })
  )
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware & static files;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));

app.use(morgan("dev"));
app.use("/", home);

app.use("/blogs", blogRoutes);

app.use(cookieParser());
app.use(
  session({
    secret: "123",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//routes

app.get("/sysinfo", async (req, res) => {
  const si = require("systeminformation");

  await si
    .cpu()
    .then((data) => console.log(data.flags, data.vendor))
    .catch((error) => console.error(error));

  return res.json("done");
});

// app.use((req, res) => {
//   res.status(404).render("404", { title: "404" });
// });
