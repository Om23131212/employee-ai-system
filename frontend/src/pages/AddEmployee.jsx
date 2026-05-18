import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";

function AddEmployee() {

  return (

    <>
      <Navbar />

      <div
        className="page-container"
        style={{
          paddingTop:"120px"
        }}
      >

        <EmployeeForm />

      </div>
    </>
  );
}

export default AddEmployee;