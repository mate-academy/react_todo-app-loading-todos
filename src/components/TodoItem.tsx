import React, { } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (todoId: number) => void;
  changeTodo: (todoId: number, updatedFields: Partial<Todo>) => void; // added from pull
};

export const TodoItem: React.FC<Props> = ({
  todo, removeTodo, changeTodo,
}) => {
  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  return (
    <div
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={() => changeTodo(todo.id, { completed: !todo.completed })}
        />
      </label>
      <span className="todo__title">{todo.title}</span>
      <button
        type="button"
        className="todo__remove"
        onClick={handleRemoveTodo}
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
