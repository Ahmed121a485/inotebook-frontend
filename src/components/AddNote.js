import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/noteContext';
import './AddNote.css'; // custom styles

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault();
    await addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <div className="card add-note-card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">📝 Add a Note</h2>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control modern-input"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control modern-input"
                id="description"
                name="description"
                value={note.description}
                onChange={onChange}
                rows="3"
                minLength={5}
                required
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input
                type="text"
                className="form-control modern-input"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>
            <button
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              className="btn btn-primary rounded-pill px-4"
              onClick={handleClick}
            >
              ➕ Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
