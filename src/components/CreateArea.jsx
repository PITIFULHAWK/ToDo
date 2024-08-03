import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = async (event) => {
    event.preventDefault();
    if (!note.title || !note.content) {
      toast.error("Please fill in both title and content");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://back123-250i.onrender.com/todo",
        note,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to create note");
      }

      onAdd(response.data.todo); // Use the created note data
      setNote({
        title: "",
        content: "",
      });
      toast.success("Note created successfully!");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const expand = () => {
    setExpanded(true);
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} disabled={isLoading}>
            {isLoading ? "Adding..." : <AddIcon />}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
