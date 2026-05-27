import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const View = () => {

  const navigate = useNavigate();

  const [contacts, setContacts] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [editedContact,
    setEditedContact] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "",
    });

  /* ================= FETCH CONTACTS ================= */

  useEffect(() => {

    fetchContacts();

  }, []);

  const fetchContacts = async () => {

    try {

      const userEmail =
        localStorage.getItem(
          "userEmail"
        );

      const response =
        await axios.get(
          `https://contactx-backend-3.onrender.com/api/contacts?userEmail=${userEmail}`
        );

      setContacts(response.data);

    } catch (error) {

      console.log(error);

      alert("Error fetching contacts");

    }

  };

  /* ================= DELETE CONTACT ================= */

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `https://contactx-backend-3.onrender.com/api/contacts/${id}`
      );

      fetchContacts();

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }

  };

  /* ================= SAVE EDIT ================= */

  const handleSave = async (id) => {

    if (
      !editedContact.name ||
      !editedContact.phone ||
      !editedContact.email ||
      !editedContact.address ||
      !editedContact.category
    ) {

      alert("Fill all fields");

      return;

    }

    try {

      await axios.put(
        `https://contactx-backend-3.onrender.com/api/contacts/${id}`,
        editedContact
      );

      setEditId(null);

      fetchContacts();

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)",
      }}
    >

      {/* BACK BUTTON */}

      <div style={backWrap}>

        <button
          style={backBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "32px",
          fontFamily: "cursive",
          background:
            "linear-gradient(90deg,#7b2cbf,#ff0080)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            "transparent",
        }}
      >
        Contact List
      </h1>

      {/* SEARCH */}

      <div style={searchWrap}>

        <input
          type="text"
          placeholder="Search Contact"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={searchInput}
        />

      </div>

      {/* EMPTY MESSAGE */}

      {
        contacts.length === 0 && (

          <div style={emptyBox}>
            No Contacts Found
          </div>
        )
      }

      {/* CONTACTS */}

      {
        contacts
          .filter((contact) =>
            contact.name &&
            contact.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((contact) => (

            <div
              key={contact._id}

              style={{
                background:
                  "rgba(255,255,255,0.25)",

                padding: "20px",

                borderRadius: "20px",

                marginBottom: "20px",

                backdropFilter:
                  "blur(10px)",

                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >

              {
                editId === contact._id ? (

                  <div>

                    <input
                      value={
                        editedContact.name
                      }

                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          name:
                            e.target.value,
                        })
                      }

                      placeholder="Name"

                      style={inputStyle}
                    />

                    <input
                      value={
                        editedContact.phone
                      }

                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          phone:
                            e.target.value,
                        })
                      }

                      placeholder="Phone"

                      style={inputStyle}
                    />

                    <input
                      value={
                        editedContact.email
                      }

                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          email:
                            e.target.value,
                        })
                      }

                      placeholder="Email"

                      style={inputStyle}
                    />

                    <input
                      value={
                        editedContact.address
                      }

                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          address:
                            e.target.value,
                        })
                      }

                      placeholder="Address"

                      style={inputStyle}
                    />

                    <input
                      value={
                        editedContact.category
                      }

                      onChange={(e) =>
                        setEditedContact({
                          ...editedContact,
                          category:
                            e.target.value,
                        })
                      }

                      placeholder="Category"

                      style={inputStyle}
                    />

                    <button
                      style={saveBtn}

                      onClick={() =>
                        handleSave(contact._id)
                      }
                    >
                      Save
                    </button>

                  </div>

                ) : (

                  <div>

                    <h2>
                      {contact.name}
                    </h2>

                    <p>
                      📞 {contact.phone}
                    </p>

                    <p>
                      📧 {contact.email}
                    </p>

                    <p>
                      📍 {contact.address}
                    </p>

                    <p>
                      🏷 {contact.category}
                    </p>

                  </div>
                )
              }

              {/* BUTTONS */}

              <div
                style={{
                  marginTop: "15px",
                }}
              >

                <button
                  style={editBtn}

                  onClick={() => {

                    setEditId(contact._id);

                    setEditedContact(
                      contact
                    );

                  }}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}

                  onClick={() =>
                    handleDelete(contact._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
      }

    </div>
  );
};

/* ================= STYLES ================= */

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

const searchWrap = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
};

const searchInput = {
  width: "300px",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
};

const editBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#7928ca",
  color: "white",
  cursor: "pointer",
};

const deleteBtn = {
  marginLeft: "10px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#ff4d4d",
  color: "white",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

const saveBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#28a745",
  color: "white",
  cursor: "pointer",
};

const emptyBox = {
  textAlign: "center",
  color: "#444",
  fontSize: "22px",
  marginTop: "60px",
};

export default View;