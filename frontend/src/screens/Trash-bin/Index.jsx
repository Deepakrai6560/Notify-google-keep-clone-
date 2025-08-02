// src/pages/Archive.jsx
import  { useState, useEffect } from "react";
import "./Index.css"
import axios from "axios";
import NotesList from "../../components/NoteList";  // adjust path as needed


const Trash = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

   const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchTrashed = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          "http://localhost:3000/api/notes?isTrash=true",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrashNotes(resp.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTrashed();
    else setError("Not authenticated");
  }, [token]);

  
  const handleTrash = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/notes/trash/${id}`,
        {}, // empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // remove from UI list
      setTrashNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Unarchive failed:", err);
    }
  };

  const handleDelete=async(id)=>{
    try {  
      const token = getAuthToken();
      console.log("Handle delete")

      const response = await axios.delete(`http://localhost:3000/api/notes/${id}`,
        {
        headers: { Authorization: `Bearer ${token}` },
      });

         setTrashNotes((prev) => prev.filter((n) => n._id !== id));

       // Remove note from state
    // setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

      // console.log("id",i)


      console.log("Response ",response)
    } catch (error) {
      console.log(error)
    }
  }


  if (loading) return <p>Loading archived notes…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="archive-page">
      <h1>Trash Notes</h1>
      {trashNotes.length === 0 ? (
        <p>No trashNotes notes.</p>
      ) : (
        <NotesList
          notes={trashNotes}
          onDelete={handleTrash}
          onDeleteForever={handleDelete}
          showTrash={true}
        />
      )}
    </div>
  );
};

export default Trash;
