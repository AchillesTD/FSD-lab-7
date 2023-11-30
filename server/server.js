const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://tanmay:tanmay@mern.jbhj6ax.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeID: String,
  departmentName: String,
  phoneNumber: String,
  DateofJoining: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Create
app.post('/employee', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read
app.get('/employee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update
app.put('/employee/:employeeID', async (req, res) => {
  try {
    const { employeeID } = req.params;
    const updatedEmployee = await Employee.findOneAndUpdate({ employeeID }, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete single employee
app.delete('/employee/:employeeID', async (req, res) => {
  try {
    const { employeeID } = req.params;
    await Employee.deleteOne({ employeeID });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete all employees
app.delete('/employees', async (req, res) => {
  try {
    await Employee.deleteMany({});
    res.json({ message: 'All employees deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});