import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #ff9a9e, #fad0c4, #a18cd1)",
      }}
    >
      <div
        style={{
          padding: "50px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          width: "420px",
        }}
      >
    <h1
  style={{
    fontSize: "72px",
    fontWeight: "900",
    letterSpacing: "2px",

    background:
      "linear-gradient(90deg, #ff6a00, #ff0080, #7928ca)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    textShadow: "0px 4px 15px rgba(0,0,0,0.15)",

    fontFamily: "Verdana",

    marginBottom: "15px",

    lineHeight: "1.2",

    overflow: "visible",
  }}
>
  ContactX
</h1>
        <p
          style={{
            color: "#444",
            marginBottom: "30px",
          }}
        >
          Smart Contact Management System
        </p>

        <button
          onClick={() => navigate("/login")}
          style={loginBtn}
        >
          Login
        </button>

        <br />
        <br />

        <button
          onClick={() => navigate("/signup")}
          style={signupBtn}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const loginBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#6a11cb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const signupBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#ff6a00",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Home;