var express = require('express');
var router = express.Router();

var students = [{
    MSSV: "RmGZEUEf51t",
    HoTen: "Thanh Tùng",
    Lop: "20DTHA1"
  },
  {
    MSSV: "nZCBIarGN3P",
    HoTen: "Mạnh Toàn",
    Lop: "20DTHA2"
  }
];

// GET all students
router.get('/', function(req, res, next) {
  res.json(students);
});

// GET student by MSSV
router.get('/:mssv', function(req, res, next) {
  const student = students.find(s => s.MSSV === req.params.mssv);
  if (!student) return res.status(404).send('Không tìm thấy sinh viên.');
  res.json(student);
});

// PUT (update) student by MSSV
router.put('/:mssv', function(req, res, next) {
  const index = students.findIndex(s => s.MSSV === req.params.mssv);
  if (index === -1) return res.status(404).send('Không tìm thấy sinh viên.');

  students[index] = {
    ...students[index],
    ...req.body
  };
  res.json(students[index]);
});

// POST (create) a new student
router.post('/', function(req, res, next) {
  const newStudent = req.body;
  newStudent.MSSV = generateMSSV();
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// DELETE (soft delete) student by MSSV
router.delete('/:mssv', function(req, res, next) {
  const index = students.findIndex(s => s.MSSV === req.params.mssv);
  if (index === -1) return res.status(404).send('Không tìm thấy sinh viên.');

  students.splice(index, 1);
  res.sendStatus(204);
});

function generateMSSV() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 11; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
