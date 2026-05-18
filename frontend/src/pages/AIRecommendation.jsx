import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function AIRecommendation() {

  const [employees, setEmployees] =
  useState([]);

  const [selectedEmployee, setSelectedEmployee] =
  useState("");

  const [response, setResponse] =
  useState("");

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const { data } = await axios.get(
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

  const generateAI = async () => {

    try {

      if (
        selectedEmployee === "all"
      ) {

        const rankedEmployees =
        [...employees].sort(
          (a, b) =>

            (
              b.performanceScore +
              b.experience
            )

            -

            (
              a.performanceScore +
              a.experience
            )
        );

        let result =
        "🏆 Employee Ranking\n\n";

        rankedEmployees.forEach(
          (emp, index) => {

            result += `
${index + 1}. ${emp.name}
Department: ${emp.department}
Score: ${emp.performanceScore}
Experience: ${emp.experience} Years

`;
          }
        );

        setResponse(result);

        return;
      }

      const employee =
      employees.find(
        (emp) =>
        emp._id === selectedEmployee
      );

      if (!employee) {

        return alert(
          "Select Employee First"
        );
      }

      const { data } = await axios.post(
        "https://employee-ai-backend-suis.onrender.com/api/ai/recommend",

        employee
      );

      setResponse(
        data.choices?.[0]?.message?.content ||
        "AI Recommendation Generated"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "AI Error"
      );
    }
  };

  return (

    <>
      <Navbar />

      <div
        className="page-container"
        style={{
          paddingTop:"120px"
        }}
      >

        <div className="glass-card">

          <h1>
            AI Employee Shortlisting
          </h1>

          <select
            value={selectedEmployee}

            onChange={(e) =>
              setSelectedEmployee(
                e.target.value
              )
            }

            style={{
              width:"100%",
              padding:"14px",
              borderRadius:"12px",
              marginTop:"20px",
              border:"none",
              outline:"none",
              fontSize:"16px"
            }}
          >

            <option value="">
              Select Employee
            </option>

            <option value="all">
              Select All Employees
            </option>

            {
              employees.map((emp) => (

                <option
                  key={emp._id}
                  value={emp._id}
                >
                  {emp.name}
                  {" - "}
                  {emp.department}
                </option>
              ))
            }

          </select>

          <button
            onClick={generateAI}

            style={{
              marginTop:"20px"
            }}
          >
            Generate AI Recommendation
          </button>

          {
            response && (

              <div
                style={{
                  marginTop:"25px",
                  lineHeight:"1.8",
                  background:
                  "rgba(255,255,255,0.1)",
                  padding:"20px",
                  borderRadius:"15px",
                  whiteSpace:"pre-line"
                }}
              >

                <h3>
                  AI Result
                </h3>

                <p>
                  {response}
                </p>

              </div>
            )
          }

        </div>

      </div>

    </>
  );
}

export default AIRecommendation;