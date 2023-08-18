const express = require("express");
const tourRouter = require("./routes/tour.routes");
const morgan = require();
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", tourRouter);

module.exports = app;
