/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Todo as TodoType } from '../../types/Todo';
import classNames from 'classnames';
import { DispatchContext } from '../../Store';
import { wait } from '../../utils/fetchClient';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(DispatchContext);

  const isCompleted = () => {
    setIsLoading(true);

    return wait(300).then(() => {
      setIsLoading(false);
      dispatch({ type: 'markCompleted', id: todo.id });
    });
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label htmlFor="todo-status" className="todo__status-label">
        <input
          id="todo-status"
          data-cy="TodoStatus"
          type="checkbox"
          onChange={isCompleted}
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
