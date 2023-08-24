import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.filter((todo) => todo.completed === true).map((todo) => (
        <div className="todo completed" key={todo.id}>
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked
            />
          </label>

          <span className="todo__title">
            {todo.title}
          </span>

          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {todos.filter((todo) => todo.completed === false).map((todo) => (
        <div className="todo" key={todo.id}>
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>
          <span className="todo__title">
            {todo.title}
          </span>
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
