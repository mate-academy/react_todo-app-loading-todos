/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  statusPatch: string;
  setStatusPatch: (event: string) => void;
}

export const TodoInfo: React.FC<Props> = ({
  todo,
  statusPatch,
  setStatusPatch,
}) => {
  const handlePatch = (event: { target: { value: string; }; }) => {
    setStatusPatch(event.target.value);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { 'todo completed': todo.completed },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
        />
      </label>
      {!statusPatch ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDeleteButton"
          >
            ×
          </button>
        </>
      ) : (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todo.title}
            onClick={() => handlePatch}
          />
        </form>
      )}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
