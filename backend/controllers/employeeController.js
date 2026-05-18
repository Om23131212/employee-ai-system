const Employee = require("../models/Employee");

const addEmployee = async (req, res) => {

  const employee = await Employee.create(req.body);

  res.status(201).json(employee);
};

const getEmployees = async (req, res) => {

  const employees = await Employee.find();

  res.json(employees);
};

const getEmployeeById = async (req, res) => {

  const employee = await Employee.findById(req.params.id);

  res.json(employee);
};

const updateEmployee = async (req, res) => {

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(employee);
};

const deleteEmployee = async (req, res) => {

  await Employee.findByIdAndDelete(req.params.id);

  res.json({
    message: "Employee Deleted"
  });
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};