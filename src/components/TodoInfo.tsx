import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Loader } from './Loader';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo: { title, completed } }) => {
  const [selected, setSelected] = useState(false);
  const [isLoad] = useState(false);
  const field = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setSelected(prev => !prev);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  useEffect(() => {
    field.current?.focus();
  }, [selected]);

  if (selected) {
    return (
      <div
        data-cy="Todo"
        className={classNames('todo', {
          completed: completed,
        })}
      >
        <label className="todo__status-label" htmlFor="todoStatus">
          <input
            id="todoStatus"
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
          />
          {}
        </label>
        {/* This form is shown instead of the title and remove button */}
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
            ref={field}
            onBlur={handleBlur}
          />
        </form>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <Loader isLoad={isLoad} />
      </div>
    );
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label" htmlFor="todoStatus">
        <input
          id="todoStatus"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
        {}
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
        onDoubleClick={handleClick}
      >
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      <Loader isLoad={isLoad} />
    </div>
  );
};
