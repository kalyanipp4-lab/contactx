import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Add = () => {

  const navigate = useNavigate();

  const [saved, setSaved] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [category, setCategory] =
    useState("");

  // CURRENT LOGGED USER EMAIL
  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  // DEFAULT CATEGORIES
  const categories =
    JSON.parse(
      localStorage.getItem("categories")
    ) || [
      "Family",
      "Friends",
      "Office",
      "Personal",
    ];

  /* ================= SAVE CONTACT ================= */

  const handleSave = async () => {

    // VALIDATION
    if (
      !name ||
      !phone ||
      !email ||
      !address ||
      !category
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    // PHONE VALIDATION
    if (phone.length !== 10) {

      alert(
        "Enter valid 10 digit phone number"
      );

      return;

    }

    // USER EMAIL CHECK
    if (!userEmail) {

      alert(
        "User not logged in"
      );

      navigate("/login");

      return;

    }

    // NEW CONTACT OBJECT
    const newContact = {

      name,
      phone,
      email,
      address,
      category,
      userEmail,

    };

    try {

      // SAVE TO BACKEND
      await axios.post(
        "https://contactx-backend-3.onrender.com/api/contacts",
        newContact
      );

      setSaved(true);

      // CLEAR INPUTS
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setCategory("");

    } catch (error) {

      console.log(error);

      alert(
        "Error saving contact"
      );

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#a18cd1,#fbc2eb,#fad0c4)",
      }}
    >

      <div
        style={{
          width: "350px",
          padding: "40px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.2)",
          backdropFilter:
            "blur(10px)",
          textAlign: "center",
        }}
      >

        {/* BACK BUTTON */}

        <div style={backWrap}>

          <button
            style={backBtn}
            onClick={() =>
              navigate(-1)
            }
          >
            ← Back
          </button>

        </div>

        <h1>Add Contact</h1>

        {/* NAME */}

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        {/* PHONE */}

        <input
          type="tel"
          placeholder="Phone Number"
          style={inputStyle}
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <br />
        <br />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        {/* ADDRESS */}

        <input
          type="text"
          placeholder="Place Address"
          style={inputStyle}
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <br />
        <br />

        {/* CATEGORY */}

        <select
          style={inputStyle}
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="">
            Select Category
          </option>

          {
            categories.map(
              (cat, index) => (

                <option
                  key={index}
                  value={cat}
                >
                  {cat}
                </option>
              )
            )
          }

        </select>

        <br />
        <br />

        {/* SAVE BUTTON */}

        <button
          style={saveBtn}
          onClick={handleSave}
        >
          Save Contact
        </button>

        {/* SUCCESS MESSAGE */}

        {
          saved && (

            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "15px",
                background:
                  "rgba(255,255,255,0.3)",
              }}
            >

              <h3
                style={{
                  color: "#2b2b2b",
                }}
              >
                Contact Saved Done ✅
              </h3>

              <button
                style={okBtn}
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                OK
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
};

/* ================= STYLES ================= */

const okBtn = {

  marginTop: "10px",

  padding: "10px 25px",

  border: "none",

  borderRadius: "10px",

  background: "#28a745",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const inputStyle = {

  width: "100%",

  padding: "12px",

  borderRadius: "10px",

  border: "none",

  outline: "none",
};

const saveBtn = {

  width: "100%",

  padding: "12px",

  border: "none",

  borderRadius: "10px",

  background: "#7928ca",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const backWrap = {

  display: "flex",

  justifyContent: "flex-start",

  marginBottom: "20px",
};

const backBtn = {

  padding: "10px 18px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#7b2cbf,#c77dff)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  boxShadow:
    "0 6px 16px rgba(0,0,0,0.1)",
};

export default Add;