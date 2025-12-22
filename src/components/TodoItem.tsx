import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const onChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo item-enter-done', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label" aria-label="label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={onChangeChecked}
          checked={isChecked}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
