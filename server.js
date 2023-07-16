const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


// console.log(DB);



// console.log(process.env);
// 4 SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening ${PORT} ing...`);
});
