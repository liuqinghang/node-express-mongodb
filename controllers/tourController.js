const Tour = require('./../model/tourModel');
const APIFeature = require('./../utils/apiFeature');

exports.aliasTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficuty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    let featrures = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    let tours = await featrures.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    let tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    let newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = (req, res) => {
  console.log(req.params);
  let id = req.params.id * 1;
  let tour = tours.find((el) => el.id == id);

  let partTour = res.body;
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  return res.status(204).json({
    status: 'success',
    message: 'delete success',
    data: null,
  });
};

exports.updateTour = async (req, res) => {
  let newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  try {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<updated tour here...>',
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
