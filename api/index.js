const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
require('dotenv').config();

// Schemas
const User = require('./models/User.js');

const app = express();

//  Middleware
app.use(express.json());
app.use(cors({
  credentials: true, 
  origin: 'http://127.0.0.1:5173'
}));

//  Database connection
mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connected'))
  .catch((e) => console.log(e));

// Password encryption
const bcryptSalt = bcrypt.genSaltSync(10);

app.get('/test', (req, res) => {
  res.json('test ok')
});

app.post('/register', async(req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await User.create({
    name,
    email,
    password:bcrypt.hashSync(password, bcryptSalt),
  });

  res.json(userDoc);
})


app.listen(4000);