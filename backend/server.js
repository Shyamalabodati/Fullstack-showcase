
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const studentSchema = new mongoose.Schema({
  name: String,
  father: String,
  class: String,
  contact: String,
  fees: Object
});

const Student = mongoose.model('Student', studentSchema);
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: 'Student added successfully', student });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
