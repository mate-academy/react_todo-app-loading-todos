import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  handleDeleteTodo: (value: number) => void;
  loading: boolean;
  handleUppCompleted: (todos: Todo) => void;
  newTitle: string;
  setNewTitle: (newTitle: string) => void;
  handleUppEdit: (todos: Todo) => Promise<boolean[]>;
  setLoading: (value: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleDeleteTodo,
  loading,
  handleUppCompleted,
  newTitle,
  setNewTitle,
  handleUppEdit,
  setLoading,
}) => {
  const [edited, setEdited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edited && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edited]);

  const { title, id, completed } = todo;

  const handleBlur = async () => {
    if (newTitle.trim().length === 0) {
      handleDeleteTodo(todo.id);

      return;
    }

    try {
      await handleUppEdit(todo);
      setEdited(false);
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTitle.trim() === title) {
        setEdited(false);
      } else {
        inputRef.current?.blur();
      }
    }

    if (e.key === 'Escape') {
      setEdited(false);
      setNewTitle(title);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      <label className="todo__status-label">
        {}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          id={`${id}`}
          onClick={() => {
            handleUppCompleted(todo);
          }}
        />
      </label>

      {edited ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          placeholder="Empty todo will be deleted"
          type="text"
          className="todo__title-field"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEdited(true);
            setLoading(true);
            setNewTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {!edited && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => handleDeleteTodo(todo.id)}
          disabled={loading}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': loading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
