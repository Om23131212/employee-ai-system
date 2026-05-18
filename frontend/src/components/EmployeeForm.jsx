import { useState } from "react";
import axios from "axios";

function EmployeeForm() {

  const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: ""
  });

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://employee-ai-backend-suis.onrender.com/api/employees",

        {
          ...formData,
          skills:
          formData.skills.split(",")
        },

        {
          headers: {
            Authorization:
            `Bearer ${
              localStorage.getItem("token")
            }`
          }
        }
      );

      console.log(response.data);

      alert("Employee Added Successfully");

      setFormData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Something Went Wrong"
      );
    }
  };

  return (

    <form
      className="glass-card"
      onSubmit={submitHandler}
    >

      <h2>Add Employee</h2>

      <input
        type="text"
        name="name"
        placeholder="Employee Name"
        value={formData.name}
        onChange={changeHandler}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Employee Email"
        value={formData.email}
        onChange={changeHandler}
        required
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={changeHandler}
        required
      />

      <input
        type="text"
        name="skills"
        placeholder="React,Node,MongoDB"
        value={formData.skills}
        onChange={changeHandler}
      />

      <input
        type="number"
        name="performanceScore"
        placeholder="Performance Score"
        value={formData.performanceScore}
        onChange={changeHandler}
      />

      <input
        type="number"
        name="experience"
        placeholder="Experience"
        value={formData.experience}
        onChange={changeHandler}
      />

      <button type="submit">
        Add Employee
      </button>

    </form>
  );
}

export default EmployeeForm;