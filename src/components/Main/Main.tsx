import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const Main: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(({ title, id }) => (
        <div key={id} className="todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">{title}</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
