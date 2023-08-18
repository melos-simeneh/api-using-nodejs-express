const express = require("express");
const tourRouter = require("./routes/tour.routes");
const morgan = require("morgan");
const app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use("/api/v1/tours", tourRouter);

module.exports = app;
