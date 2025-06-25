const express = require('express');
const router = express.Router();
const User = require('./User');

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).send('User already exists');
  const user = new User({ username, password, entries: [] });
  await user.save();
  res.send('Signup success');
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) return res.status(401).send('Invalid credentials');
  res.json({ username });
});

// Get entries
router.get('/entries/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json(user?.entries || []);
});

// Add entry
router.post('/entries', async (req, res) => {
  const { username, text, date } = req.body;
  const user = await User.findOne({ username });
  user.entries.unshift({ text, date });
  await user.save();
  res.send('Entry added');
});

// Delete entry
router.delete('/entries/:username/:id', async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  user.entries = user.entries.filter(e => e._id != req.params.id);
  await user.save();
  res.send('Entry deleted');
});

module.exports = router;
