import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { ErrorContext, ErrorsMessageContext } from './ErrorsContext';

type Props = {
  todo: Todo ;
};
export const TodoItem : React.FC<Props> = ({ todo }) => {
  const { setErrorsMesage } = useContext(ErrorsMessageContext);

  const { isError, setIsError } = useContext(ErrorContext);
  const deleteTodo = () => {
    if (isError) {
      setIsError(false);
    }

    setIsError(true);
    setErrorsMesage('delete');
  };

  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
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
