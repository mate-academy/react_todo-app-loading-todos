import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  formList: Todo;
}

export const MainList: React.FC<Props> = ({ formList }) => {
  const { title, completed } = formList;

  return (
    <>
      <div className={`todo ${completed ? 'completed' : ''}`}>

        <label
          className="todo__status-label"
        >
          <input type="checkbox" className="todo__status" checked />
        </label>

        <span className="todo__title">{title}</span>
        <button type="button" className="todo__remove">
          ×
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>

      {/*  <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>

       { <span className="todo__title">Todo is being saved now</span>
        <button type="button" className="todo__remove">×</button>

        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>}
      </div> */}
    </>
  );
};
