/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { wait } from './utils/fetchClient';
import { Status } from './types/Status';
import { TodosFilters } from './components/TodosFilters';
import { TodosList } from './components/TodosList';

const USER_ID = 12112;

enum Error {
  get = 'Unable to load todos',
  submit = 'Title should not be empty',
  post = 'Unable to add a todo',
  delete = 'Unable to delete a todo',
  patch = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, settodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.all);
  const [error, setError] = useState('');

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  useEffect(() => {
    setError('');

    getTodos(USER_ID)
      .then(settodos)
      .catch(() => setError(Error.get))
      .finally(() => wait(3000).then(() => setError('')));
  }, []);

  const complitedQty = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodosList
          todos={todos}
          status={status}
        />

        {todos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${complitedQty} items left`}
            </span>

            <TodosFilters
              status={status}
              setStatus={setStatus}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={complitedQty === 0}
            >
              Clear completed
            </button>

          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        {error}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
      </div>
    </div>
  );
};
