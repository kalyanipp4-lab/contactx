import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const ContactList = () => {

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  const [categories, setCategories] = useState([
    "Family",
    "Office",
    "Friends",
    "Personal",
  ]);

  const [newCategory, setNewCategory] =
    useState("");

  /* FETCH CONTACTS */

  useEffect(() => {

    fetchContacts();

    const storedCategories =
      JSON.parse(
        localStorage.getItem("categories")
      );

    if (storedCategories) {

      setCategories(storedCategories);

    }

  }, []);

  const fetchContacts = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/contacts"
        );

      setContacts(response.data);

    } catch (error) {

      console.log(error);

      alert("Error fetching contacts");

    }

  };

  /* ADD CATEGORY */

  const addCategory = () => {

    if (newCategory.trim() === "")
      return;

    if (
      categories.includes(newCategory)
    )
      return;

    const updatedCategories = [
      ...categories,
      newCategory,
    ];

    setCategories(updatedCategories);

    localStorage.setItem(
      "categories",
      JSON.stringify(updatedCategories)
    );

    setNewCategory("");

  };

  /* DELETE CATEGORY */

  const deleteCategory = (cat) => {

    const updatedCategories =
      categories.filter(
        (c) => c !== cat
      );

    setCategories(updatedCategories);

    localStorage.setItem(
      "categories",
      JSON.stringify(updatedCategories)
    );

  };

  return (

    <div style={container}>

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

      <h2 style={title}>
        ContactX
      </h2>

      {/* ADD CATEGORY */}

      <div style={topBar}>

        <input
          value={newCategory}
          onChange={(e) =>
            setNewCategory(
              e.target.value
            )
          }
          placeholder="Create New Category"
          style={topInput}
        />

        <button
          onClick={addCategory}
          style={createBtn}
        >
          Create
        </button>

      </div>

      {/* CATEGORY GRID */}

      <div style={grid}>

        {categories.map((cat, i) => {

          const catContacts =
            contacts.filter(
              (c) =>
                c.category === cat
            );

          return (

            <div
              key={i}
              style={card}
              onClick={() =>
                navigate(
                  `/category/${cat}`
                )
              }
            >

              {/* DELETE BUTTON */}

              <button
                style={deleteBtn}
                onClick={(e) => {

                  e.stopPropagation();

                  deleteCategory(cat);

                }}
              >
                ✕
              </button>

              {/* ICON */}

              <div style={iconWrap}>

                {cat === "Family" &&
                  "🏡"}

                {cat === "Office" &&
                  "💼"}

                {cat === "Friends" &&
                  "🎉"}

                {cat === "Personal" &&
                  "✨"}

                {![
                  "Family",
                  "Office",
                  "Friends",
                  "Personal",
                ].includes(cat) &&
                  "📌"}

              </div>

              {/* CATEGORY NAME */}

              <h2 style={cardTitle}>
                {cat}
              </h2>

              {/* CONTACT COUNT */}

              <p style={countText}>
                {catContacts.length} Contacts
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
};

/* ================= STYLES ================= */

const container = {

  minHeight: "100vh",

  padding: "40px",

  background:
    "linear-gradient(135deg,#f8f5ff,#ffe5ec,#edf6ff)",
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

const title = {

  textAlign: "center",

  marginBottom: "40px",

  fontSize: "55px",

  fontWeight: "bold",

  fontFamily: "cursive",

  background:
    "linear-gradient(90deg,#7b2cbf,#c77dff,#ff758f)",

  WebkitBackgroundClip: "text",

  WebkitTextFillColor: "transparent",
};

const topBar = {

  display: "flex",

  justifyContent: "center",

  gap: "12px",

  marginBottom: "45px",

  flexWrap: "wrap",
};

const topInput = {

  padding: "14px",

  width: "240px",

  borderRadius: "16px",

  border: "none",

  outline: "none",

  background: "white",

  boxShadow:
    "0 6px 18px rgba(0,0,0,0.08)",

  fontSize: "14px",
};

const createBtn = {

  padding: "14px 20px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg,#7b2cbf,#c77dff)",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  boxShadow:
    "0 6px 16px rgba(0,0,0,0.1)",
};

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(190px,220px))",

  justifyContent: "center",

  gap: "25px",
};

const card = {

  position: "relative",

  background:
    "linear-gradient(135deg,#ffffff,#f8f5ff)",

  borderRadius: "28px",

  padding: "25px 18px",

  textAlign: "center",

  cursor: "pointer",

  transition: "0.3s ease",

  boxShadow:
    "0 8px 22px rgba(0,0,0,0.08)",

  border:
    "1px solid rgba(255,255,255,0.4)",
};

const iconWrap = {

  width: "70px",

  height: "70px",

  margin: "auto",

  borderRadius: "22px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "30px",

  background:
    "linear-gradient(135deg,#ffccd5,#cdb4db,#a2d2ff)",

  boxShadow:
    "0 6px 16px rgba(0,0,0,0.08)",
};

const cardTitle = {

  marginTop: "18px",

  fontSize: "22px",

  color: "#2b2b2b",

  fontWeight: "bold",
};

const countText = {

  color: "#666",

  marginTop: "6px",

  fontSize: "13px",
};

const deleteBtn = {

  position: "absolute",

  top: "12px",

  right: "12px",

  width: "32px",

  height: "32px",

  border: "none",

  borderRadius: "10px",

  background: "#ffe5ec",

  color: "#ff006e",

  cursor: "pointer",

  fontSize: "14px",

  fontWeight: "bold",
};

export default ContactList;