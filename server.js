const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/auth-system', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
  
      await newUser.save();
      res.status(201).send('User registered');
    } catch (err) {
      res.status(400).send('Error registering user');
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
      }
  
      const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(400).send('Error logging in');
    }
  });



  const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).send('Access denied');
    }
  
    try {
      const verified = jwt.verify(token, 'secretKey');
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  };
  
  app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
  });