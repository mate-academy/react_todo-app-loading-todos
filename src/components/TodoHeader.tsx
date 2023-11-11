/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { ActionType } from '../states/Reducer';
import { DispatchContext, StateContext } from '../states/Global';
import { postTodo } from '../api/todos';
import { ErrorType } from '../types/ErrorType';

export const TodoHeader: React.FC = React.memo(() => {
  const [title, setTitle] = useState('');

  const { userId, todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      postTodo(userId, {
        title,
        userId,
        completed: false,
      })
        .then(response => {
          setTitle('');

          dispatch({
            type: ActionType.Create,
            payload: {
              todo: response,
            },
          });
        })
        .catch(() => {
          dispatch({
            type: ActionType.ToggleError,
            payload: { errorType: ErrorType.CreateError },
          });
        });
    }
  };

  const toggleAll = () => {};

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
});
