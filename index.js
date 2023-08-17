const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

app.get("/api/v1/tours", (req, res) => {
  res.json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
