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
      console.log("Token:", token)
      // const token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzg4NzIwZTEyNzI5MGRkZDMyMWZhMCIsImlhdCI6MTc1MjczMDczNywiZXhwIjoxNzUyODE3MTM3fQ.XSPmUyCtYQyNUUUahdDnjw_PsQhyjTTNWWs_69Q-964`
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
      // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzg4NzIwZTEyNzI5MGRkZDMyMWZhMCIsImlhdCI6MTc1MjczMDczNywiZXhwIjoxNzUyODE3MTM3fQ.XSPmUyCtYQyNUUUahdDnjw_PsQhyjTTNWWs_69Q-964`;
      const token = getAuthToken();
      console.log("Token:", token)
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      console.log("Fetching notes...");
      const response = await axios.get("http://localhost:3000/api/notes?isArchive=false&&isTrash=false", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Received notes:", response.data);
      if (Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        console.error("Received invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

const handleDelete= async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    // pass {} as the body, then the config object:
    const response = await axios.patch(
      `http://localhost:3000/api/notes/trash/${id}`,
      {}, //  <-- empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // update your local state however you like; for example:
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

    console.log("Archive toggled:", response.data);
  } catch (error) {
    console.error("Error archiving note:", error.response?.data || error.message);
  }
};

const handleArchive = async (id) => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    // pass {} as the body, then the config object:
    const response = await axios.patch(
      `http://localhost:3000/api/notes/${id}`,
      {}, //  <-- empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // update your local state however you like; for example:
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));

    console.log("Archive toggled:", response.data);
  } catch (error) {
    console.error("Error archiving note:", error.response?.data || error.message);
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
        onArchive={(id) =>
          handleArchive(id)
        }

        onDelete={(id)=>{
          handleDelete(id)
        }}

        onChangeBg={(id) => {
          const colors = ["#ffffff", "#fef3c7", "#e0f2fe", "#dcfce7","#FFB6C1"];
          setNotes((prev) =>
            prev.map((note) =>
              note._id === id
                ? {
                    ...note,
                    background:
                      colors[
                        (colors.indexOf(note.background || "#ffffff") + 1) %
                          colors.length
                      ],
                  }
                : note
            )
          );
        }}
      />
    </div>
  );
};

export default AddNotes;
