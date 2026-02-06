import React, { Component } from "react";

// Mock API endpoint
const mockApiUrl = "https://sumalathavelpula-ops.github.io/DevOpsAndFullStack/abc.json"
//"./abc.json/users/1"
//"https://jsonplaceholder.typicode.com/users/1"; 
// This URL returns a mock user

class StudentProfile extends Component 
{
  constructor(props)
 {
    super(props);
    // Initialize state
    this.state = {  
      student: null,
      loading: true,
    };
    console.log("Constructor: Initializing state");
  }

  // Fetch student data when component mounts
  componentDidMount() {
    console.log("componentDidMount: Fetching student data");
    fetch(mockApiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          student: data,
          loading: false,
        });
      });
  }

  // Log state updates when component updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.student !== this.state.student) {
      console.log("componentDidUpdate: State updated", this.state.student);
    }
  }

  // Clean up when the component unmounts
  componentWillUnmount() {
    console.log("componentWillUnmount: Cleaning up");
  }

  render() {
    const { student, loading } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Student Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h3>Name: {student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
          </div>
        )}
      </div>
    );
  }
}
export default StudentProfile;
