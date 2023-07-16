const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTop5Cheap, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
