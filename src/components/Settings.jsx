import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation വേണ്ടി ഇമ്പോർട്ട് ചെയ്തു

const Settings = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // isOpen 'false' ആണെങ്കിൽ ഈ കമ്പോണന്റ് സ്ക്രീനിൽ കാണിക്കില്ല
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header - Title & Close Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#2b2b2b" }}>⚙️ Settings</h2>
          <button onClick={onClose} style={closeBtnStyle}>✖</button>
        </div>

        {/* Features List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* 1. Edit Profile Button - ഇവിടെ മാറ്റം വരുത്തിയിട്ടുണ്ട് */}
          <button 
            style={featureBtnStyle} 
            onClick={() => {
              onClose(); // സെറ്റിങ്സ് പോപ്പ്-അപ്പ് ക്ലോസ് ചെയ്യുന്നു
              navigate("/profile"); // നമ്മൾ ഉണ്ടാക്കിയ പുതിയ പ്രൊഫൈൽ പേജിലേക്ക് പോകുന്നു
            }}
          >
            👤 Edit Profile
          </button>

          <button style={featureBtnStyle} onClick={() => alert("Privacy Settings Coming Soon!")}>
            🔒 Privacy & Security
          </button>
          
          {/* 2. Dark Mode Button - സിംപിൾ ആയി വർക്ക് ചെയ്യിക്കാൻ ഒരു ട്രിക്ക് */}
          <button 
            style={featureBtnStyle} 
            onClick={() => {
              if (document.body.style.filter === "invert(1) hue-rotate(180deg)") {
                document.body.style.filter = "none";
              } else {
                document.body.style.filter = "invert(1) hue-rotate(180deg)";
              }
            }}
          >
            🌙 Toggle Dark Mode
          </button>
          
          {/* Logout Button */}
          <button 
            style={{ ...featureBtnStyle, background: "rgba(255, 0, 0, 0.15)", color: "#d60000" }} 
            onClick={() => {
              // localStorage-ൽ സൂക്ഷിച്ചിരിക്കുന്ന യൂസർ വിവരങ്ങൾ കളയുന്നു
              localStorage.removeItem("token"); 
              localStorage.removeItem("user"); 

              // സെറ്റിങ്സ് മോഡൽ ക്ലോസ് ചെയ്യുന്നു
              onClose(); 

              // നേരെ ലോഗിൻ പേജിലേക്ക് വിടുന്നു
              navigate("/login"); 
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// പോപ്പ് അപ്പിന് പിന്നിലുള്ള ഇരുണ്ട ബാക്ക്ഗ്രൗണ്ട് സ്റ്റൈൽ
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)", 
  backdropFilter: "blur(5px)", // ബാക്ക്ഗ്രൗണ്ട് ബ്ലർ ചെയ്യാൻ
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

// സെറ്റിങ്സ് ബോക്സിന്റെ സ്റ്റൈൽ (Glassmorphism)
const modalStyle = {
  width: "320px",
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.85)", 
  backdropFilter: "blur(15px)",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
  fontFamily: "Arial, sans-serif",
};

const closeBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "#555",
};

const featureBtnStyle = {
  padding: "12px",
  textAlign: "left",
  background: "rgba(255, 255, 255, 0.6)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#333",
  fontSize: "15px",
};

export default Settings;