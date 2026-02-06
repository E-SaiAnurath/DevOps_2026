import React, { useState } from "react";
import StudentProfile from "./StudentProfile";
function App() {
  const [showProfile, setShowProfile] = useState(true);
  // Toggle visibility of StudentProfile
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Lifecycle Demonstration</h1>
      <button onClick={toggleProfile}>
        {showProfile ? "Hide" : "Show"} Student Profile
      </button>
      {/* Render StudentProfile only when showProfile is true */}
      {showProfile && <StudentProfile />}
    </div>
  );
}
export  default  App;
