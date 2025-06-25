require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//require('dotenv').config();

//mongoose.connect(process.env.MONGODB_URI)

const routes = require('./JournalRoutes'); // ✅ Fix here

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',                     // for local dev
    'https://daily-journal-steel.vercel.app'      // ✅ REPLACE with your real Vercel URL
  ],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json());


console.log("🛠️ server.js started");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err.message));

app.use('/api', routes);//route
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

