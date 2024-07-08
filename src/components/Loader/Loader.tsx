import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  // <div className="Loader" data-cy="loader">
  //   <div className="Loader__content" />
  <div data-cy="TodoLoader" className="modal overlay is-active">
    <div className="modal-background has-background-white-ter" />
    <div className="loader" />
  </div>
  // </div>

  // {/* overlay will cover the todo while it is being deleted or updated */}
  //   <div data-cy="TodoLoader" className="modal overlay">
  //   <div className="modal-background has-background-white-ter" />
  //   <div className="loader" />
  // </div>
  // </div>

  // <div data-cy="TodoLoader" className="modal overlay">
  // <div className="modal-background has-background-white-ter" />
  // <div className="loader" />
  // </div>
  // </div>
  // {/* This todo is in loadind state */}
  // <div data-cy="Todo" className="todo">
  // {/* <label className="todo__status-label">
  // <input
  //   data-cy="TodoStatus"
  //   type="checkbox"
  //   className="todo__status"
  // />
  // </label>

  // <span data-cy="TodoTitle" className="todo__title">
  // Todo is being saved now
  // </span>

  // <button type="button" className="todo__remove" data-cy="TodoDelete">
  // ×
  // </button> */}

  // {/* 'is-active' class puts this modal on top of the todo */}

  // {/* <Loader /> */}
  // </div>

  // {/* </div> */}
  // {/* // </div> */}
);
