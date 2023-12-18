import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useTodos } from '../../TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();
  const { title, completed, id } = todo;

  const handleToggleTodo = () => {
    toggleTodo(id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          data-cy="TodoStatus"
          className="todo__status"
          checked={completed}
          onChange={handleToggleTodo}
        />
      </label>

      <span
        className="todo__title"
        data-cy="TodoTitle"
      >
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteTodo}
      >
        ×
      </button>

      <div
        className="modal overlay"
        data-cy="TodoLoader"
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
