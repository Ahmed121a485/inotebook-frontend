import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Notes.css'; // custom styles

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getallNotes, editNote } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const modalRef = useRef(null);
  const refClose = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/Login');
    } else {
      getallNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    ref.current.click();
  };

  const handleClick = async () => {
    try {
      await editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      
    } catch (error) {
      toast.error("❌ Failed to update note.");
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      let modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
      if (!modalInstance) {
        modalInstance = new window.bootstrap.Modal(modalRef.current);
      }
      modalInstance.hide();
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Add Note Component (now handles its own toast) */}
      <AddNote />

      {/* Hidden trigger for modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch modal
      </button>

      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modern-modal">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">✏️ Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-outline-secondary"
                onClick={handleClose}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleClick}
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
              >
                ✅ Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row my-4">
        <h2 className="section-title">🗒 Your Notes</h2>
        {notes.length === 0 ? (
          <div className="text-center text-muted my-4">
            <p>No notes yet. Add one to get started!</p>
          </div>
        ) : (
          notes.map((note) => (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
