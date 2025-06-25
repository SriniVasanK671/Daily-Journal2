const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./JournalRoutes'); // ✅ Fix here

const app = express();
app.use(cors());
app.use(express.json());

console.log("🛠️ server.js started");

mongoose.connect('mongodb://localhost:27017/journal-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err.message));

app.use('/api', routes);//middware

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
