import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import SignIn from "./SignIn";
import Signup from "./Signup";

function App() {
    const [notes, setNotes] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            fetchTodos(token); // Fetch todos when authenticated
        }
    });

    async function fetchTodos(token) {
        try {
            const response = await fetch("https://back123-250i.onrender.com/todos", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }

            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    const addNote = async (newNote) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("https://back123-250i.onrender.com/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newNote),
            });

            if (response.ok) {
                const addedNote = await response.json();
                setNotes((prevNotes) => [...prevNotes, addedNote]);
            } else {
                throw new Error("Failed to add note");
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deleteNote = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`https://back123-250i.onrender.com/api/todos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            } else {
                throw new Error(`Failed to delete note: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/" element={
                    isAuthenticated ? (
                        <>
                            <CreateArea onAdd={addNote} />
                            {notes.map((noteItem, index) => (
                                <Note
                                    key={index}
                                    id={noteItem._id}
                                    title={noteItem.title}
                                    content={noteItem.content}
                                    onDelete={deleteNote}
                                />
                            ))}
                            <Footer />
                        </>
                    ) : (
                        <Navigate to="/signin" />
                    )
                } />
            </Routes>
        </Router>
    );
}

export default App;
