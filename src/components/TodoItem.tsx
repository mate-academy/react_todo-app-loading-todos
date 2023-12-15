import React, {
  useContext, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { ErrorContext, ErrorsMessageContext } from './ErrorsContext';

type Props = {
  todo: Todo ;
};
export const TodoItem : React.FC<Props> = ({ todo }) => {
  const { setErrorsMesage } = useContext(ErrorsMessageContext);
  const { isError, setIsError } = useContext(ErrorContext);
  const [onEdit, setOnEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const deleteTodo = () => {
    if (isError) {
      setIsError(false);
    }

    setIsError(true);
    setErrorsMesage('delete');
  };

  const updateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (isError) {
      setIsError(false);
    }

    setIsError(true);
    setErrorsMesage('update');
  };

  const handleDoubleClick = () => {
    setOnEdit(true);
  };

  const handleCancelEdit = () => {
    setOnEdit(false);
    setEditedTitle(todo.title);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo',
        { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
        />
      </label>

      {onEdit ? (
        <form onSubmit={updateTodo}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleCancelEdit}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        onMouseDown={deleteTodo}
        data-cy="TodoDelete"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
