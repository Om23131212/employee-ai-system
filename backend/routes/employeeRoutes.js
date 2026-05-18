const express = require("express");

const {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

const { protect } =
require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
.post(protect, addEmployee)
.get(protect, getEmployees);

router.route("/:id")
.get(protect, getEmployeeById)
.put(protect, updateEmployee)
.delete(protect, deleteEmployee);

module.exports = router;