/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { KeyboardEvent, useState } from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Actions } from '../types/Actions';

interface TodoProps {
  todo: TodoType,
  setCurrentAction: (arg0:Actions) => void,
}

export const Todo: React.FC<TodoProps> = ({
  todo, setCurrentAction,
}) => {
  const [editable, setEditable] = useState(false);
  const [titleState, setTitleState] = useState(todo.title);
  const [inProgress] = useState(false);

  const {
    completed,
  } = todo;

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  return (
    <div className={`todo ${completed
      ? 'completed'
      : ''}`}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      {editable
        ? (
          <form>
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={titleState}
              onChange={(event) => setTitleState(event?.target.value)}
              onKeyDown={handleEnter}
              onBlur={() => {
                setEditable(false);
                setCurrentAction('update');
              }}
            />
          </form>
        )
        : (
          <>
            <span
              className="todo__title"
              onClick={() => setEditable(true)}
            >
              {titleState}
            </span>
            <button
              type="button"
              className="todo__remove"
              onClick={() => setCurrentAction('delete')}
            >
              ×
            </button>
          </>
        )}
      <div className={`modal overlay ${inProgress ? 'is-active' : ''}`}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
