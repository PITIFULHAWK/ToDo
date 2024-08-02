import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

function CreateArea({ onAdd }) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => ({ ...prevNote, [name]: value }));
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
      const response = await fetch("https://back123-250i.onrender.com/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const newNote = await response.json(); // Get the created note from the response
      onAdd(newNote); // Call the onAdd prop with the newNote data

      setNote({ title: "", content: "" });
      toast.success("Note created successfully!");
    } catch (err) {
      console.error("Error creating note:", err);
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
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
