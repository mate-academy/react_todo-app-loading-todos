import React from 'react';
import cn from 'classnames';
import { Todo as TodoItem } from '../../types/Todo';

type Props = {
  todo: TodoItem;
  selectedTodoId: number;
  setSelectedTodoId: (id: number) => void;
};

export const Todo: React.FC<Props> = ({
  todo,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
      onDoubleClick={() => setSelectedTodoId(id)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {id === selectedTodoId
        ? (
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={title}
            />
          </form>
        )
        : (
          <>
            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              ×
            </button>
          </>
        )}

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
