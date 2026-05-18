import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="navbar">

      <div className="navbar-left">

        <h2
          onClick={() =>
            navigate("/dashboard")
          }
        >
          EmployeeAI
        </h2>

      </div>

      <div className="navbar-right">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate("/add-employee")
          }
        >
          Add Employee
        </button>

        <button
          onClick={() =>
            navigate("/employees")
          }
        >
          Employees
        </button>

        <button
          onClick={() =>
            navigate("/ai")
          }
        >
          AI Shortlisting
        </button>

        <button
          className="logout-btn"
          onClick={logoutHandler}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;