/* eslint-disable import/no-cycle */

import classNames from 'classnames';
import { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo, TodoContextProps } from '../types/interfaces';

interface ItemProps {
  todo: Todo
}

export const TodoItem: React.FC<ItemProps> = ({ todo }) => {
  const { handleCheck } = useContext(TodoContext) as TodoContextProps;

  const onClickHandler: React.MouseEventHandler<HTMLInputElement> = () => {
    handleCheck(todo);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo',
        { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={onClickHandler}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
