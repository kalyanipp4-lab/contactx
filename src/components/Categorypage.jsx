import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const CategoryPage = () => {

  const { name } = useParams();

  const navigate = useNavigate();

  const [contacts, setContacts] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [editedContact,
    setEditedContact] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "",
    });

  const [search, setSearch] =
    useState("");

  /* FETCH CONTACTS */

  useEffect(() => {

    fetchContacts();

  }, [name]);

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

    const filtered =
      response.data.filter(
        (c) =>
          c.category
            ?.toLowerCase() ===
          name?.toLowerCase()
      );

    setContacts(filtered);

  } catch (error) {

    console.log(error);

    alert("Error fetching contacts");

  }

};

  /* DELETE CONTACT */

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

  /* SAVE EDIT */

  const handleSave = async (id) => {

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

    <div style={container}>

      {/* TOP BAR */}

      <div style={topBar}>

        <button
          style={backBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 style={title}>
          {name}
        </h1>

      </div>

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

      {/* CONTACT GRID */}

      <div style={grid}>

        {
          contacts
            .filter((c) =>
              c.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((contact) => (

              <div
                key={contact._id}
                style={card}
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

                      <div style={avatar}>
                        {
                          contact.name
                            .charAt(0)
                        }
                      </div>

                      <h2 style={nameStyle}>
                        {contact.name}
                      </h2>

                      <p style={info}>
                        📞 {contact.phone}
                      </p>

                      <p style={info}>
                        📧 {contact.email}
                      </p>

                      <p style={info}>
                        📍 {contact.address}
                      </p>

                      <p style={info}>
                        🏷 {contact.category}
                      </p>

                    </div>
                  )
                }

                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    justifyContent:
                      "center",
                    gap: "10px",
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

      {
        contacts.length === 0 && (

          <div style={emptyBox}>
            No Contacts Found
          </div>
        )
      }

    </div>
  );
};

/* STYLES */

const container = {
  minHeight: "100vh",
  padding: "40px",
  background:
    "linear-gradient(135deg,#f8f5ff,#ffe5ec,#edf6ff)",
};

const topBar = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "40px",
};

const backBtn = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg,#7b2cbf,#c77dff)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const title = {
  fontSize: "45px",
  fontWeight: "bold",
  fontFamily: "cursive",
  background:
    "linear-gradient(90deg,#7b2cbf,#ff758f)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const searchWrap = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "40px",
};

const searchInput = {
  width: "300px",
  padding: "15px",
  border: "none",
  outline: "none",
  borderRadius: "18px",
  background: "white",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "25px",
};

const card = {
  background: "white",
  borderRadius: "25px",
  padding: "20px",
};

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg,#7b2cbf,#ff758f)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  fontSize: "28px",
  fontWeight: "bold",
};

const nameStyle = {
  textAlign: "center",
};

const info = {
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "none",
};

const saveBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#28a745",
  color: "white",
};

const editBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#7b2cbf",
  color: "white",
};

const deleteBtn = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "10px",
  background: "#ff4d4d",
  color: "white",
};

const emptyBox = {
  textAlign: "center",
  marginTop: "40px",
};

export default CategoryPage;