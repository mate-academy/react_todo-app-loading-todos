/* eslint-disable jsx-a11y/no-autofocus */
import { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoComponent:FC<Props> = ({ todo }) => {
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  return (
    <div
      data-cy="TodoComponent"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
        />
      </label>

      {todo.id === selectedTodoId ? (
        <form>
          <input
            data-cy="TodoTitleField"
            autoFocus
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            onBlur={() => setSelectedTodoId(0)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setSelectedTodoId(todo.id)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>
        </>
      )}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
