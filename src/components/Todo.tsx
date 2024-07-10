import React, { useEffect, useRef } from 'react';
import { Todo as TodoType } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: TodoType;
  isEditingTodo: TodoType | null;
  setIsEditingTodo: (todo: TodoType | null) => void;
  handleCompletedStatus: (id: number) => void;
};

export const Todo: React.FC<Props> = ({
  todo,
  isEditingTodo,
  setIsEditingTodo,
  handleCompletedStatus,
}) => {
  const { id, title, completed } = todo;

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current && isEditingTodo) {
      todoField.current.focus();
    }
  }, [isEditingTodo]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleCompletedStatus(id)}
        />
      </label>

      {isEditingTodo?.id === id ? (
        <form>
          <input
            type="text"
            data-cy="TodoTitleFIeld"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={isEditingTodo.title}
            onChange={element =>
              setIsEditingTodo({ ...todo, title: element.target.value })
            }
            onBlur={() => setIsEditingTodo(null)}
            ref={todoField}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditingTodo(todo)}
          >
            {title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
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
