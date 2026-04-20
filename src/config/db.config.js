const mongoose = require('mongoose');
const { NODE_ENV, ATLAS_DB_URL } = require('./server.config');

async function connectToDb() {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(ATLAS_DB_URL);
      console.log('connected TO mongoDB');
    }
  } catch (error) {
    console.log('unable to connect to DB');
    console.log(error);
  }
}
module.exports = connectToDb;
