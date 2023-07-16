const mongoose = require('mongoose');
const DB = process.env.DATABASE || 'mongodb://127.0.0.1:27017/natours';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: [true, 'tour name conflict'],
  },
  price: Number,
  duration: Number,
  difficulty: String,
  maxGroupSize: Number,
  ratingsAverage: Number,
  ratingsQuantity: Number,
  summary: String,
  description: String,
  imageCover: String,
  images: [],
  startDates: [],
  createdAt: String,
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
