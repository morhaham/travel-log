require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares");
const logs = require("./api/logs");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connected");
    // logEntry.collection.drop();
  })
  .catch((error) => console.log(error.message));

const app = express();
app.use(morgan("common"));
app.use(helmet());
// change to app.use(cors({origin:process.env.CORS_ORIGIN})) in production
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.use("/api/logs", logs);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});
