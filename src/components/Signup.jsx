import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  // SIGNUP FUNCTION
  const handleSignup = async () => {

    // Empty field check
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Password match check
    if (
      password !== confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {

      // Backend API call
      const response =
        await axios.post(
          "https://contactx-backend-3.onrender.com/api/signup",
          {
            username,
            email,
            password,
          }
        );

      // Username save
      localStorage.setItem(
        "username",
        response.data.user.username
      );

      alert("Signup Successful");

      // Dashboard
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed"
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
          "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
          width: "300px",
          position: "relative",
        }}
      >

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          style={homeBtn}
        >
          ⬅ Home
        </button>

        <h1 style={{ color: "#2b2b2b" }}>
          Sign Up
        </h1>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        <br />
        <br />

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <br />
        <br />

        {/* Signup Button */}
        <button
          style={buttonStyle}
          onClick={handleSignup}
        >
          Create Account
        </button>

      </div>
    </div>
  );
};

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
  background: "#ff6a00",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
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

export default Signup;