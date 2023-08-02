import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  loadingTodoId: number | null;
  onSetLoadingTodo: (id: number) => void,
};

export const OneTodo: React.FC<Props> = ({
  todo, loadingTodoId, onSetLoadingTodo,
}) => {
  return (
    <div className={classNames(
      'todo', { completed: todo.completed },
    )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      <button
        type="button"
        className="todo__remove"
        onClick={() => onSetLoadingTodo(todo.id)}
      >
        ×
      </button>

      <div className={classNames(
        'modal', 'overlay', { 'is-active': loadingTodoId === todo.id },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
