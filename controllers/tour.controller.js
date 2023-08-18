const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
);

exports.checkID = (req, res, next, val) => {
  const tour = tours.find((t) => t.id === val * 1);
  if (!tour)
    return res
      .status(404)
      .json({ status: "fail", message: `Tour with id ${val} not found` });
  console.log("ID is " + val);
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: "fail", message: "Missing name or price" });
  next();
};

exports.getAllTours = (req, res) => {
  res.json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(tours), (err) => {
    res
      .status(201)
      .json({ status: "success", message: "Tour created", data: { newTour } });
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((t) => t.id === id * 1);
  res.json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((t) => t.id === id * 1);
  const { duration, name, difficulty } = req.body;
  tour.name = name;
  tour.duration = duration;
  tour.difficulty = difficulty;
  res.json({
    status: "success",
    message: "Tour updated",
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id;
  const otherTours = tours.filter((t) => t.id !== id * 1);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(otherTours), (err) => {
    res.json({
      status: "success",
      message: "Tour deleted successfully",
    });
  });
};
