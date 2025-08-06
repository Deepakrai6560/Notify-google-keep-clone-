import React, { useState, useRef, useEffect } from "react";
import "./AddNotes.css";
import axios from "axios";
import NotesList from "../NoteList/index.jsx";

const AddNotes = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);
  const textareaRef = useRef(null);

  const handleExpand = () => setIsExpanded(true);

  const handleBlur = () => {
    if (!note.title && !note.content) {
      setIsExpanded(false);
    }
  };

  const handleContentChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setNote({ ...note, content: e.target.value });
  };

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const handleOnSubmit = async () => {
    if (!note.title && !note.content) return;

    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/notes",
        note,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotes((prevNotes) => [response.data, ...prevNotes]);
      setNote({ title: "", content: "" });
      setIsExpanded(false);
    } catch (error) {
      console.error("Error submitting note:", error.response?.data || error.message);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/notes?isArchive=false&&isTrash=false",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        console.error("Received invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.patch(
        `http://localhost:3000/api/notes/trash/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      console.log("Note trashed:", response.data);
    } catch (error) {
      console.error("Error trashing note:", error.response?.data || error.message);
    }
  };

  const handleArchive = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await axios.patch(
        `http://localhost:3000/api/notes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      console.log("Note archived:", response.data);
    } catch (error) {
      console.error("Error archiving note:", error.response?.data || error.message);
    }
  };

  const handleChangeBg = async (id) => {
    const colors = ["#ffffff", "#fef3c7", "#e0f2fe", "#dcfce7", "#FFB6C1"];

    const noteToUpdate = notes.find((n) => n._id === id);
    if (!noteToUpdate) return;

    const currentColor = noteToUpdate.background || "#ffffff";
    const newColor =
      colors[(colors.indexOf(currentColor) + 1) % colors.length];

    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No token");
        return;
      }

      // Backend me update
      await axios.put(
        `http://localhost:3000/api/notes/${id}`,
        { background: newColor },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Local state update
      setNotes((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, background: newColor } : note
        )
      );
    } catch (err) {
      console.error("Error changing background:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note.content]);

  return (
    <div className="notes-container">
      <div
        className="note-input-box"
        onClick={handleExpand}
        onBlur={() => handleOnSubmit()}
      >
        {isExpanded && (
          <input
            className="note-title"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        )}
        <textarea
          className="note-content"
          ref={textareaRef}
          placeholder="Take a note..."
          rows={1}
          value={note.content}
          onChange={handleContentChange}
          onBlur={handleBlur}
        />
      </div>

      <NotesList
        notes={notes}
        onPin={(id) =>
          setNotes((prev) =>
            prev.map((note) =>
              note._id === id ? { ...note, isPinned: !note.isPinned } : note
            )
          )
        }
        onArchive={handleArchive}
        onDelete={handleDelete}
        onChangeBg={handleChangeBg}
      />
    </div>
  );
};

export default AddNotes;
