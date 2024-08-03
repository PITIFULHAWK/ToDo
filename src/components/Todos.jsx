import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://back123-250i.onrender.com/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        toast.error("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`https://back123-250i.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        toast.success("Note deleted successfully");
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("An error occurred while deleting the note.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <CreateArea onAdd={addTodo} />
      {todos.map((todo) => (
        <Note
          key={todo._id}
          id={todo._id}
          title={todo.title}
          content={todo.content}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}

export default Todos;
