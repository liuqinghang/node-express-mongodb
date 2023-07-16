const mongoose = require('mongoose');
const DB = process.env.DATABASE || 'mongodb://127.0.0.1:27017/natours';
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' });

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: [true, 'tour name conflict'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: Number,
});

const tours = JSON.parse(
  // fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('import success');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('delete success');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
console.log(process.argv);
