import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onChange: (isChecked: boolean, id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = (
  {
    todos,
    onChange,
    onRemove,
  },
) => (
  <section className="todoapp__main">
    {todos.map(todo => {
      const {
        id,
        title,
        completed,
      } = todo;

      return (
        <div
          className={
            classNames(
              'todo',
              { completed },
            )
          }
          key={id}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={(event) => onChange(event.target.checked, id)}
            />
          </label>

          <span className="todo__title">{title}</span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            onClick={() => onRemove(id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      );
    })}
  </section>
);
