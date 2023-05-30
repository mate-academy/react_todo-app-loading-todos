import React from 'react';
import { Todo } from '../../types/Todo';

type Prop = {
  todos: Todo[],
};

export const TodoList:React.FC<Prop> = React.memo(
  ({ todos }) => {
    return (
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo ${todo.completed ? 'completed' : ''}`}
          >
            <label
              id={todo.id.toString(10)}
              className="todo__status-label"
            >
              <input
                type="checkbox"
                id={todo.id.toString(10)}
                className="todo__status"
                checked
              />
            </label>

            <span className="todo__title">{todo.title}</span>

            {/* Remove button appears only on hover */}
            <button type="button" className="todo__remove">×</button>

            {/* overlay will cover the todo while it is being updated */}
            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </li>
        ))}
      </ul>
    );
  },
);
