import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Note({
  id, title, content, onDelete
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : <DeleteIcon />}
      </button>
    </div>
  );
}

export default Note;
