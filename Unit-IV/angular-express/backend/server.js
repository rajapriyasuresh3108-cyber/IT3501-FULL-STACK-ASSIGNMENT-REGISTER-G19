const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  {
    id: 1,
    name: "Arun",
    department: "Information Technology"
  },
  {
    id: 2,
    name: "Priya",
    department: "Computer Science"
  }
];

// GET - Retrieve students
app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

// POST - Add a new student
app.post("/api/students", (req, res) => {
  const { name, department } = req.body;

  if (!name || !department) {
    return res.status(400).json({
      message: "Name and department are required"
    });
  }

  const student = {
    id: students.length + 1,
    name,
    department
  };

  students.push(student);

  res.status(201).json({
    message: "Student added successfully",
    student
  });
});

app.listen(5001, () => {
  console.log("Express server running on port 5001");
});