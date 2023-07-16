const fs = require('fs');
const Tour = require('./../model/tourModel');
const { match } = require('assert');

exports.aliasTop5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficuty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // 1. filter
    let queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. advance filter
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));
    // 3.1 sort result
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('--createdAr');
    }
    // 3.2 limit fields
    if (req.query.fields) {
      let fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 3.3 pagination result
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 100;
    let skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip > numTours) {
        throw new Error('this page not exist');
      }
    }

    // . execute query

    let tours = await query;
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
  // console.log(req.params);
  // let id = req.params.id;
  // let tour = tours.find((el) => el.id == id);
  // // if (id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  // return res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
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
  // console.log(req.body);
  // let newId = tours[tours.length - 1].id + 1;
  // let newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tours: newTour,
  //       },
  //     });
  //   }
  // );
  // console.log(newTour);
  // res.send('Done');
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

  // console.log(req.params);
  // let id = req.params.id * 1;
  // let tour = tours.find((el) => el.id == id);

  // let partTour = res.body;
  // // if (id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

  // return res.status(200).json({
  //   status: 'success',
  //   message: 'update success',
  //   data: tour,
  // });
};
