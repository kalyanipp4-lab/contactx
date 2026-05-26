import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "";
    setName(storedName);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (name.trim() === "") {
      alert("Please enter a name");
      return;
    }

    
    localStorage.setItem("username", name);
    
    alert("Profile Updated!");
    
    navigate("/dashboard");
    
    window.location.reload(); 
  };

  return (
    <div style={containerStyle}>
      <div style={formBoxStyle}>
        <h2 style={{ color: "#2b2b2b" }}>👤 Edit Profile</h2>
        <form onSubmit={handleUpdate}>
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label>New Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} // ടൈപ്പ് ചെയ്യുമ്പോൾ സ്റ്റേറ്റ് മാറുന്നു
              style={inputStyle}
            />
          </div>
          <button type="submit" style={saveBtnStyle}>Update Name</button>
          <button type="button" onClick={() => navigate("/dashboard")} style={{...saveBtnStyle, background: "#888", marginTop: "10px"}}>Cancel</button>
        </form>
      </div>
    </div>
  );
};


const containerStyle = { minHeight: "100vh", background: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)", display: "flex", justifyContent: "center", alignItems: "center" };
const formBoxStyle = { padding: "30px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", width: "300px", textAlign: "center" };
const inputStyle = { width: "100%", padding: "10px", marginTop: "5px", borderRadius: "8px", border: "none" };
const saveBtnStyle = { width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: "#7928ca", color: "white", fontWeight: "bold", cursor: "pointer" };

export default Profile;