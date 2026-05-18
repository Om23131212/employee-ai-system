import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {

  const [employees, setEmployees] =
  useState([]);

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const { data } =
      await axios.get(
        "https://employee-ai-backend-suis.onrender.com/api/employees",

        {
          headers: {
            Authorization:
            `Bearer ${
              localStorage.getItem("token")
            }`
          }
        }
      );

      setEmployees(data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `https://employee-ai-backend-suis.onrender.com/api/employees/${id}`,

        {
          headers: {
            Authorization:
            `Bearer ${
              localStorage.getItem("token")
            }`
          }
        }
      );

      fetchEmployees();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="employee-grid">

      {
        employees.map((emp) => (

          <div
            className="glass-card"
            key={emp._id}
          >

            <h2>{emp.name}</h2>

            <p>{emp.email}</p>

            <p>{emp.department}</p>

            <p>
              Skills:
              {emp.skills.join(", ")}
            </p>

            <p>
              Score:
              {emp.performanceScore}
            </p>

            <p>
              Experience:
              {emp.experience} Years
            </p>

            <button
              onClick={() =>
                deleteEmployee(emp._id)
              }
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default EmployeeList;