import { useState } from "react";
import noteContext from "./noteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  // fetch all notes
  const getallNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data = await response.json();
      setnotes(data);
    } catch (error) {
      toast.error("❌ Error fetching notes. Please try again later.");
      if (process.env.NODE_ENV === "development") {
        console.error("Fetch Notes Error:", error);
      }
    }
  };

  // add note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.statusText}`);
      }

      const note = await response.json();
      setnotes(notes.concat(note));
      toast.success("✅ Note added successfully!");
    } catch (error) {
      toast.error("❌ Error adding note. Please try again.");
      if (process.env.NODE_ENV === "development") {
        console.error("Add Note Error:", error);
      }
    }
  };

  // delete note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }

      await response.json();

      const newNotes = notes.filter((note) => note._id !== id);
      setnotes(newNotes);
      toast.success("🗑️ Note deleted successfully!");
    } catch (error) {
      toast.error("❌ Error deleting note. Please try again.");
      if (process.env.NODE_ENV === "development") {
        console.error("Delete Note Error:", error);
      }
    }
  };

  // edit note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      await response.json();

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);
      toast.success("✏️ Note updated successfully!");
    } catch (error) {
      toast.error("❌ Error updating note. Please try again.");
      if (process.env.NODE_ENV === "development") {
        console.error("Update Note Error:", error);
      }
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
