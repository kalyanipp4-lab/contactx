import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Settings from "./Settings"; // Settings component ഇമ്പോർട്ട് ചെയ്തു

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Settings ഓപ്പൺ ആണോ എന്ന് നോക്കാനുള്ള state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // localStorage-ൽ നിന്ന് ലോഗിൻ ചെയ്ത ആളുടെ പേര് എടുക്കുന്നു. ഇല്ലെങ്കിൽ 'User' എന്ന് കാണിക്കും.
  const username = localStorage.getItem("username") || "User";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          padding: "28px 20px",
          borderRadius: "15px",
        }}
      >
        {/* Logo */}
        <h1
          style={{
            margin: 0,
            paddingTop: "10px",
            fontSize: "48px",
            fontWeight: "bold",
            fontStyle: "italic",
            letterSpacing: "2px",
            lineHeight: "1.4",
            fontFamily: "cursive",
            background: "linear-gradient(90deg, #ff6a00, #ff0080, #7b2ff7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            overflow: "visible",
          }}
        >
          ContactX
        </h1>

        {/* Profile Icon and Username Container */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          
          {/* Settings (Profile) Icon with Round Style */}
          <div
            onClick={() => setIsSettingsOpen(true)}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.4)", 
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              cursor: "pointer",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            👤
          </div>

          {/* Profile Icon-ന്റെ താഴെ പേര് കാണിക്കുന്നു */}
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#2b2b2b" }}>
            {username}
          </span>

        </div>
      </div>

      {/* Welcome */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2 style={{ color: "#2b2b2b" }}>Dashboard</h2>
        <p style={{ color: "#444" }}>Manage all your contacts easily</p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          marginTop: "50px",
        }}
      >
        {/* Add Contact */}
        <div style={cardStyle}>
          <h2>➕</h2>
          <h3>Add Contact</h3>
          <p>Add new contacts quickly</p>
          <button style={btnStyle} onClick={() => navigate("/add")}>Open</button>
        </div>

        {/* View Contacts */}
        <div style={cardStyle}>
          <h2>👀</h2>
          <h3>View Contacts</h3>
          <p>View saved contacts</p>
          <button style={btnStyle} onClick={() => navigate("/view")}>Open</button>
        </div>

        {/* Contact List */}
        <div style={cardStyle}>
          <h2>📋</h2>
          <h3>Contact List</h3>
          <p>Organized contact records</p>
          <button style={btnStyle} onClick={() => navigate("/contacts")}>Open</button>
        </div>
      </div>

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

const cardStyle = {
  width: "250px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
};

const btnStyle = {
  marginTop: "15px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#7928ca",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Dashboard;