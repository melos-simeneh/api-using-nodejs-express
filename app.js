const express = require("express");
const tourRouter = require("./routes/tour.routes");
const morgan = require("morgan");

const app = express();

console.log(process.env.NODE_ENV === "development");

//MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

//ROUTES
app.use("/api/v1/tours", tourRouter);

module.exports = app;
