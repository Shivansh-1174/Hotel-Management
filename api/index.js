const express = require('express');
const mongoose = require('mongoose');
const Rooms = require('./models/Rooms')


const cors = require('cors');

const app = express();

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// connect to the database
mongoose.connect('mongodb+srv://shivanshsuman:Cricketlover17@cluster0.q4jicj5.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log("DB success")
}).catch((err) => {
  console.log(err);
});

// create a schema

// create a model


// create a POST endpoint to handle form submissions




app.post('/booking', async (req, res) => {
  const { email, selectValue, checkIn, checkOut, price } = req.body;
  console.log(req.body);

  // create a new document
  Rooms.create({
    email,
    type: selectValue,
    checkIn,
    checkOut,
    price
  }).then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
  })



  // save the document to the database

});


app.get('/viewList', async (req, res) => {
  try {
    const bookings = await Rooms.find({});
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/checker', async (req, res) => {
  try {
    const bookings = await Rooms.find({});
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/fetch/:id', (req, res) => {
  console.log(req);
  const { id } = req.params;
  Rooms.findOne({ _id: id }).then(response => res.send(response));

})

app.post('/edit/:id', (req, res) => {

  const { id } = req.params;
  const update = { email: req.body.email, type: req.body.type, checkIn: req.body.checkIn, checkOut: req.body.checkOut, price: req.body.price }
  console.log(update);
  Rooms.findOneAndUpdate({ _id: id }, update).then(response => {

    res.send(response)
  }).catch(err => {
    console.log(err);
  }
  );

})

app.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  Rooms.findOneAndDelete({ _id: id })
    .then(response => {
      console.log(response)
      res.json(response);
    }).catch(err => {
      console.log(err);
    })
})

// start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});