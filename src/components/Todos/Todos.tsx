/* eslint-disable no-constant-condition */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
  /* removeTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
  editedTodoId: number;
  callEditeMode: (event: React.MouseEvent<HTMLSpanElement>) => void;
  submitInput: () => void; */
};

export const Todos: React.FC<Props> = ({
  todos,
  /* removeTodo,
  editedTodoId,
  callEditeMode,
  submitInput, */
}) => {
  return (
    <div>
      {todos?.map(todo => (
        <div
          key={todo.id}
          id={`${todo.id}`}
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              readOnly
            />
          </label>
          {/* editedTodoId === todo.id  */ false ? (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
                onChange={() => {}}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // submitInput();
                  }
                }}
                // onBlur={submitInput}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </form>
          )
            : (
              <>
                <span
                  className="todo__title"
                  // onDoubleClick={callEditeMode}
                >
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  // onClick={removeTodo}
                >
                  ×
                </button>
              </>
            )}
          <div className={classNames(
            'modal',
            'overlay',
            { /* 'is-active': todoStatus === '' */ },
          )}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </div>
  );
};
