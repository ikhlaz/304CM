const axios = require('axios');
const cors = require('cors');
const express = require('express');
const Record = require('./client/src/connect');

const app = express();
var dataset = {};
var city_, dateG_, dateH_, time01, time02, time03, time04, time05, record;

app.get('/search', cors(), (req, res) => {
  const search = req.query.city;
  if (search != '') {
    const querystr01 = `https://dailyprayer.abdulrcs.repl.co/api/${search}`;
    const querystr02 = `https://api.aladhan.com/v1/gToH`;

    axios
      .get(querystr01)
      .then( (response) => {
        city_ = response.data.city;
        dateG_ = response.data.date;
        time01 = response.data.today.Fajr;
        time02 = response.data.today.Dhuhr;
        time03 = response.data.today.Asr;
        time04 = response.data.today.Maghrib;
        time05 = response.data.today["Isha'a"];

        axios
          .get(querystr02)
          .then( (response) => { 
            dateH_ = response.data.data.hijri.date;

            dataset = {
              city: city_,
              dateG: dateG_,
              dateH: dateH_,
              time_Fajr: time01,
              time_Zuhr: time02,
              time_Asar: time03,
              time_Maghrib: time04,
              time_Isha: time05
            };
            
            res.json(dataset);

            record = new Record({
              city: city_,
              dateG: dateG_,
              dateH: dateH_,
              time_Fajr: time01,
              time_Zuhr: time02,
              time_Asar: time03,
              time_Maghrib: time04,
              time_Isha: time05
            });
            record
            .save()
            .then(result=>{console.log("Success " + result)})
            .catch(error=>{console.log("Error " + error)});
            });
      });
  } else {
    dataset = {
      city: "-",
      dateG: "-",
      dateH: "-",
      time_Fajr: "-",
      time_Zuhr: "-",
      time_Asar: "-",
      time_Maghrib: "-",
      time_Isha: "-"
    };
    res.json(dataset);
  }
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);