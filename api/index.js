require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Rooms = require('./models/Rooms')
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB success")
}).catch((err) => {
  console.log(err);
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

app.post('/booking', async (req, res) => {
  const { email, selectValue, checkIn, checkOut, price } = req.body;

  console.log(req.body);
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


});


app.get('/viewList', (req, res) => {
  Rooms.find({}).then(bookings => {
    console.log(bookings);
    res.json({ data: bookings })
  }).catch(err => {
    console.error(err);
    res.status(500).send('Server Error');
  })

});

app.get('/fetch/:id', (req, res) => {
  const { id } = req.params;  //destructuring
  Rooms.findOne({ _id: id }).then(data => res.send(data))
    .catch(err => {
      console.log(err);
    });

})

app.post('/edit/:id', (req, res) => {

  const { id } = req.params;
  const update = { email: req.body.email, type: req.body.type, checkIn: req.body.checkIn, checkOut: req.body.checkOut, price: req.body.price }

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

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});