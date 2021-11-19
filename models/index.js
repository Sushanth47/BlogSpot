require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));
