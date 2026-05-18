import Navbar from "../components/Navbar";
import EmployeeList from "../components/EmployeeList";
import SearchFilter from "../components/SearchFilter";

function Employees() {

  return (

    <>
      <Navbar />

      <div
        style={{
          paddingTop:"120px",
          paddingLeft:"40px",
          paddingRight:"40px"
        }}
      >

        <SearchFilter />

        <EmployeeList />

      </div>
    </>
  );
}

export default Employees;