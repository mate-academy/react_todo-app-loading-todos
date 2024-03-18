import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './Todos-Context';

interface PropsItem {
  todo: Todo;
}
export const TodoItem: React.FC<PropsItem> = ({ todo }) => {
  const { loading, handleCompleted } = useContext(TodosContext);
  const { title, completed, id } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => handleCompleted(id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div
          className={classNames('modal-background has-background-white-ter', {
            'is-active': loading,
          })}
        />
        <div className="loader" />
      </div>
    </div>
  );
};
