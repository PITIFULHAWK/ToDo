import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Note(props) {
  const [isDeleting, setIsDeleting] = useState(false); // State to track deletion

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    setIsDeleting(true); // Disable button during deletion
    try {
      const response = await fetch(`https://back123-250i.onrender.com/api/todos/${props.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        props.onDelete(props.id);
        toast.success("Note deleted successfully");
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note."); // More user-friendly error message
    } finally {
      setIsDeleting(false); // Re-enable the button
    }
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : <DeleteIcon />}
      </button>
    </div>
  );
}

export default Note;
