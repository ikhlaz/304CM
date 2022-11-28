//  INCLUDE 
const mongoose = require('mongoose');

//  CONNECTION PARAMETERS
//   - database     : name of the database
//   - collection   : name of the collection/database 
//   - connect      : mongodb atlas connection code
const database = "database";
const collection = "collection";
const connect = `mongodb+srv://admin:admin@cluster0.ma2ij5b.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose
.connect(connect)
.then(()=> {
    console.log("Successfully connected to database");
})
.catch(()=> {
    console.log("Unable to connect to database");
});

//  DATABASE SCHEMA
//     formatting 
const schema = new mongoose.Schema({
    city:{type: String, unique: true},
    dateG:{type: String},
    dateH:{type: String},
    time_Fajr:{type: String},
    time_Zuhr:{type: String},
    time_Asar:{type: String},
    time_Maghrib:{type: String},
    time_Isha:{type: String}
});

const Record = mongoose.model(collection, schema);
module.exports = Record;
