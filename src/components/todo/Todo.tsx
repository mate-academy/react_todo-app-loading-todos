import React, { useState } from 'react';
import cn from 'classnames';
import { OnTodoChange, Todo } from '../../types/Todo';
import './todo.scss';

type Props = {
  todo: Todo;
  onTodoChange: OnTodoChange;
  isLoading: boolean;
  isDoubleclicked: boolean;
  setIsDoubleclicked: (isDoubleclicked: boolean) => void;
  editing: number | null;
  setEditing: (isEditing: number | null) => void;
};

export const TodoComponent: React.FC<Props> = ({
  todo,
  onTodoChange,
  isLoading,
  isDoubleclicked,
  setIsDoubleclicked,
  editing,
  setEditing,
}) => {
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmedTitle = todoTitle.trim();

    onTodoChange(todo, 'title', trimmedTitle);
  };

  const handleEscKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTodoTitle(todo.title);
    }
  };

  return (
    <>
      <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={e => {
              onTodoChange(todo, 'completed', e.currentTarget.checked);
              setEditing(todo.id);
            }}
          />
          <span className="is-sr-only">Toggle todo status</span>
        </label>

        {editing === todo.id && isDoubleclicked ? (
          <form onSubmit={handleSubmit} key={todo.id}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              autoFocus
              value={todoTitle}
              onChange={e => setTodoTitle(e.currentTarget.value)}
              onBlur={handleSubmit}
              onKeyUp={handleEscKey}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditing(todo.id);
                setIsDoubleclicked(true);
              }}
            >
              {todoTitle}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </>
        )}
        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', {
            'is-active': isLoading && editing === todo.id,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
