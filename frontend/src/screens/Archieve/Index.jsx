// src/pages/Archive.jsx
import React, { useState, useEffect } from "react";
import "./Index.css"
import axios from "axios";
import NotesList from "../../components/NoteList";  // adjust path as needed

const Archive = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArchived = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          "http://localhost:3000/api/notes?isArchive=true",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArchivedNotes(resp.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchArchived();
    else setError("Not authenticated");
  }, [token]);

  const handleUnarchive = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/notes/${id}`,
        {}, // empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // remove from UI list
      setArchivedNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Unarchive failed:", err);
    }
  };

  if (loading) return <p>Loading archived notes…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="archive-page">
      <h1>Archived Notes</h1>
      {archivedNotes.length === 0 ? (
        <p>No archived notes.</p>
      ) : (
        <NotesList
          notes={archivedNotes}
          onArchive={handleUnarchive}
        />
      )}
    </div>
  );
};

export default Archive;
