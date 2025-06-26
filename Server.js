// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./JournalRoutes');

const app = express();
app.use(cors());
app.use(express.json());

console.log("🛠️ server.js started");

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://srini:12345@daily-journal.pnx5yun.mongodb.net/KEC', {
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err.message));

app.use('/api', routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

