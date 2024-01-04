/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api/todos';
import { Error } from './types/Error';
import { wait } from './utils/fetchClient';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

const USER_ID = 12112;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.all);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Error.get))
      .finally(() => wait(3000).then(() => setErrorMessage('')));
  }, []);

  const completedLength = todos?.filter(todo => todo.completed).length;

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

        <TodoList
          todos={todos}
          filterBy={filterBy}
        />

        {todos && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${completedLength} items left`}
            </span>

            <TodoFilter
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
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
          { hidden: !errorMessage },
        )}
      >
        {errorMessage}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
      </div>
    </div>
  );
};
