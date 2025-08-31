import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';
import './Noteitem.css'; // import custom styles

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="note-card card my-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2 action-icon text-danger"
                title="Delete Note"
                onClick={() => deleteNote(note._id)}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2 action-icon text-primary"
                title="Edit Note"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>
          <p className="card-text mt-2 text-muted">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
