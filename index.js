const express = require("express");
const tourRouter = require("./routes/tour.routes");
const app = express();

app.use(express.json());

app.use("/api/v1/tours", tourRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
