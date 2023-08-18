const express = require("express");
const fs = require("fs");
const router = express.Router();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`, "utf-8"));
const getAllTours = (req, res) => {
  res.json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(tours), (err) => {
    res
      .status(201)
      .json({ status: "success", message: "Tour created", data: { newTour } });
  });
};

const getTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((t) => t.id === id * 1);
  if (!tour)
    return res
      .status(404)
      .json({ status: "fail", message: `Tour with id ${id} not found` });

  res.json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((t) => t.id === id * 1);
  if (!tour)
    return res
      .status(404)
      .json({ status: "fail", message: `Tour with id ${id} not found` });
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

const deleteTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((t) => t.id === id * 1);
  if (!tour)
    return res
      .status(404)
      .json({ status: "fail", message: `Tour with id ${id} not found` });

  const otherTours = tours.filter((t) => t.id !== id * 1);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(otherTours), (err) => {
    res.json({
      status: "success",
      message: "Tour deleted successfully",
    });
  });
};

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;