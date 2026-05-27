import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {

  const navigate =
    useNavigate();

  const [users, setUsers] =
    useState([]);

  const [contacts, setContacts] =
    useState([]);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [showSettings,
    setShowSettings] =
    useState(false);

  /* ================= FETCH USERS ================= */

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "https://contactx-backend-3.onrender.com/api/users"
        );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= FETCH CONTACTS ================= */

  const fetchContacts = async () => {

    try {

      const response =
        await axios.get(
          "https://contactx-backend-3.onrender.com/api/contacts"
        );

      setContacts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

    fetchContacts();

  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  /* ================= USER CONTACTS ================= */

  const userContacts =
    contacts.filter(
      (contact) =>
        contact.userEmail ===
        selectedUser?.email
    );

  const uniqueCategories =
    [
      ...new Set(
        userContacts.map(
          (contact) =>
            contact.category
        )
      ),
    ];

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: darkMode
          ? "#121212"
          : "linear-gradient(135deg,#f8f5ff,#ffe5ec,#edf6ff)",

        color: darkMode
          ? "white"
          : "black",
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            color: darkMode
              ? "white"
              : "#7b2cbf",
          }}
        >
          Admin Dashboard
        </h1>

        {/* SETTINGS */}

        <div
          style={{
            position: "relative",
          }}
        >

          <button
            onClick={() =>
              setShowSettings(
                !showSettings
              )
            }
            style={settingsBtn}
          >
            ⚙ Settings
          </button>

          {
            showSettings && (

              <div
                style={{
                  position:
                    "absolute",

                  right: 0,

                  top: "50px",

                  background:
                    darkMode
                      ? "#222"
                      : "white",

                  padding: "20px",

                  borderRadius:
                    "15px",

                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.1)",

                  width: "200px",
                }}
              >

                <button
                  style={optionBtn}

                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                >
                  {
                    darkMode
                      ? "☀ Light Mode"
                      : "🌙 Dark Mode"
                  }
                </button>

                <button
                  style={{
                    ...optionBtn,
                    background:
                      "#ff4d6d",
                    color: "white",
                  }}

                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>

              </div>
            )
          }

        </div>

      </div>

      {/* COUNTS */}

      <div style={countWrap}>

        <div style={countCard}>
          <h2>
            {users.length}
          </h2>

          <p>Total Users</p>
        </div>

        <div style={countCard}>
          <h2>
            {contacts.length}
          </h2>

          <p>Total Contacts</p>
        </div>

      </div>

      {/* USERS */}

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Users
      </h2>

      {
        users.map((user) => (

          <div
            key={user._id}

            style={{
              background:
                darkMode
                  ? "#1f1f1f"
                  : "white",

              padding: "20px",

              borderRadius:
                "16px",

              marginBottom:
                "15px",

              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              boxShadow:
                "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >

            <div>

              <h3>
                {user.username}
              </h3>

              <p>
                {user.email}
              </p>

            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <button
                style={viewBtn}

                onClick={() =>
                  setSelectedUser(user)
                }
              >
                View
              </button>

              <button
                style={deleteBtn}

                onClick={async () => {

                  try {

                    await axios.delete(
                      `https://contactx-backend-3.onrender.com/api/users/${user._id}`
                    );

                    fetchUsers();

                    alert(
                      "User Deleted"
                    );

                  } catch (error) {

                    console.log(error);

                  }

                }}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      }

      {/* USER DETAILS */}

      {
        selectedUser && (

          <div
            style={{
              marginTop: "40px",

              padding: "30px",

              borderRadius:
                "20px",

              background:
                darkMode
                  ? "#1f1f1f"
                  : "white",

              boxShadow:
                "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >

            <h2>
              {selectedUser.username}
            </h2>

            <p>
              {selectedUser.email}
            </p>

            <br />

            <h3>
              Total Contacts :
              {" "}
              {
                userContacts.length
              }
            </h3>

            <h3>
              Categories :
              {" "}
              {
                uniqueCategories.length
              }
            </h3>

            <br />

            {
              userContacts.map(
                (contact) => (

                  <div
                    key={
                      contact._id
                    }

                    style={{
                      background:
                        darkMode
                          ? "#2a2a2a"
                          : "#f8f8f8",

                      padding:
                        "15px",

                      borderRadius:
                        "12px",

                      marginBottom:
                        "12px",
                    }}
                  >

                    <h4>
                      {
                        contact.name
                      }
                    </h4>

                    <p>
                      📞
                      {" "}
                      {
                        contact.phone
                      }
                    </p>

                    <p>
                      🏷
                      {" "}
                      {
                        contact.category
                      }
                    </p>

                  </div>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
};

/* ================= STYLES ================= */

const countWrap = {

  display: "flex",

  gap: "20px",

  marginBottom: "40px",
};

const countCard = {

  background: "white",

  padding: "25px",

  borderRadius: "18px",

  width: "220px",

  textAlign: "center",

  boxShadow:
    "0 6px 18px rgba(0,0,0,0.08)",
};

const settingsBtn = {

  padding: "12px 20px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg,#7b2cbf,#c77dff)",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const optionBtn = {

  width: "100%",

  padding: "12px",

  border: "none",

  borderRadius: "10px",

  marginBottom: "10px",

  cursor: "pointer",

  fontWeight: "bold",
};

const viewBtn = {

  padding: "10px 18px",

  border: "none",

  borderRadius: "10px",

  background:
    "#7b2cbf",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

const deleteBtn = {

  padding: "10px 18px",

  border: "none",

  borderRadius: "10px",

  background: "#ff4d6d",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold",
};

export default Admin;