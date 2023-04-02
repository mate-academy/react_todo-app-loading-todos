/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoCreate } from './components/TodoCreate';
import { TodoInfo } from './components/TodoInfo';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

const USER_ID = '6757';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>();
  const [selectedForm, setSelectedForm] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [countComplited, setCountComplited] = useState(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const askTodos = (url: string) => {
    client
      .get(url)
      .then((todos) => {
        setTodosFromServer(todos as Todo[]);
      })
      .catch(() => setErrorMessage('Unable to update a todo'));
  };

  const clearCompleted = () => {
    if (todosFromServer) {
      todosFromServer.forEach((todo => {
        if (todo.completed) {
          client
            .delete(`/todos/${todo.id}`)
            .finally(() => {
              askTodos('/todos?userId=6757');
            });
        }
      }));
    }
  };

  const sortTodos = (format: string) => {
    const url = '/todos?userId=6757';

    switch (format) {
      case 'active':
        askTodos(`${url}&completed=false`);
        setSelectedForm('active');
        break;
      case 'completed':
        askTodos(`${url}&completed=true`);
        setSelectedForm('completed');
        break;

      case 'all':
      default:
        askTodos(url);
        setSelectedForm('all');
        break;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoCreate
            setErrorMessage={setErrorMessage}
            clearCompleted={clearCompleted}
            askTodos={askTodos}
            countComplited={countComplited}
          />
        </header>

        <section className="todoapp__main">
          <TodoInfo
            setErrorMessage={setErrorMessage}
            todosFromServer={todosFromServer}
            askTodos={askTodos}
            setCountComplited={setCountComplited}
          />
        </section>

        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${todosFromServer?.length || 0} items left`}
          </span>

          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link', {
                  selected: selectedForm === 'all',
                },
              )}
              onClick={() => sortTodos('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link', {
                  selected: selectedForm === 'active',
                },
              )}
              onClick={() => sortTodos('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link', {
                  selected: selectedForm === 'completed',
                },
              )}
              onClick={() => sortTodos('completed')}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            onClick={clearCompleted}
            hidden={!countComplited}
          >
            Clear completed
          </button>
        </footer>
      </div>

      {errorMessage && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button type="button" className="delete" />

          {errorMessage}
        </div>
      )}

    </div>
  );
};
