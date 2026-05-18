import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <>
      <Navbar />

      <div className="dashboard-container">

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/add-employee")
            }
          >

            <h2>
              Add Employee
            </h2>

            <p>
              Add and manage employee details
            </p>

          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/employees")
            }
          >

            <h2>
              Employee Records
            </h2>

            <p>
              Track employee skills and performance metrics
            </p>

          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/ai")
            }
          >

            <h2>
              AI Recommendation
            </h2>

            <p>
              Generate AI-based recommendations for promotions and training
            </p>

          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/employees")
            }
          >

            <h2>
              Analytics & Ranking
            </h2>

            <p>
              View employee analytics and rankings
            </p>

          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/")
            }
          >

            <h2>
              Secure Authentication
            </h2>

            <p>
              Secure the application using JWT authentication
            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;