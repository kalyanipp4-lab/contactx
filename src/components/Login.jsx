import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // LOGIN FUNCTION

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please fill all fields");

      return;

    }

    try {

      /* ================= ADMIN LOGIN ================= */

      if (
        email === "admin@contactx.com" &&
        password === "1234"
      ) {

        const adminResponse =
          await axios.post(
            "http://localhost:5000/api/admin/login",
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "admin",
          "true"
        );

        localStorage.setItem(
          "adminName",
          adminResponse.data.admin.username
        );

        alert("Admin Login Successful");

        navigate("/admin");

        return;
      }

      /* ================= USER LOGIN ================= */

      const response =
        await axios.post(
          "http://localhost:5000/api/login",
          {
            email,
            password,
          }
        );

      // SAVE USERNAME

      localStorage.setItem(
        "username",
        response.data.user.username
      );

      // SAVE USER EMAIL

      localStorage.setItem(
        "userEmail",
        response.data.user.email
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #a18cd1, #fad0c4, #fbc2eb)",
      }}
    >

      <div
        style={{
          padding: "40px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          width: "300px",
          position: "relative",
        }}
      >

        {/* HOME BUTTON */}

        <button
          onClick={() => navigate("/")}
          style={homeBtn}
        >
          ⬅ Home
        </button>

        <h1 style={{ color: "#2b2b2b" }}>
          Login
        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <br />
        <br />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <br />
        <br />

        {/* LOGIN BUTTON */}

        <button
          style={buttonStyle}
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
};

/* ================= STYLES ================= */

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#6a11cb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const homeBtn = {
  position: "absolute",
  top: "15px",
  left: "15px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#333",
};

export default Login;