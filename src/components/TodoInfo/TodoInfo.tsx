/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext, useState } from 'react';

import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { TodosControlContext } from '../context/TodosContext';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  inputTodo: string;
  setInputTodo: (value: string) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { removeTodo, handleCheck } = useContext(TodosControlContext);
  const [isLoading] = useState(false);
  const inputId = `todo-status-${todo.id}`;

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label htmlFor={inputId} className="todo__status-label">
        <input
          id={inputId}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheck(todo)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
        {/* <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder={todo.title}
              value={inputTodo}
              onChange={event => {
                setInputTodo(event.target.value);
              }}
            />
          </form> */}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      {isLoading && <Loader />}
      {!isLoading && (
        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', { 'is-active': false })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
