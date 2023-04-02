/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
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
  const [countComplited, setCountComplited] = useState(false); // есть ли хоть один елемент completed
  const [countNotComplited, setCountNotComplited] = useState(false); // есть ли хоть один елемент active

  useEffect(() => {
  }, [todosFromServer]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const setBlock = {
    setCountComplited,
    setCountNotComplited,
  };

  const statusComplited = {
    countComplited,
    countNotComplited,
  };

  const askServer = (url: string) => {
    client
      .get(url)
      .then((todos) => {
        // console.log(todos)

        setTodosFromServer(todos as Todo[]);
      })
      .catch(() => setErrorMessage('Unable to update a todo'));
  };

  const askTodos = debounce((url) => askServer(url), 1000);

  const clearCompleted = async (status: string) => {
    if (todosFromServer) {
      todosFromServer.forEach((todo => {
        switch (status) {
          case 'completed':
            if (todo.completed) {
              client
                .delete(`/todos/${todo.id}`)
                .finally(() => {
                  askTodos('/todos?userId=6757');
                });
            }

            break;

          case 'invert':
          default:
            if (countComplited && !countNotComplited) {
              client
                .patch(`/todos/${todo.id}`, { completed: false })
                .then(() => {
                  askTodos('/todos?userId=6757');
                });
            } else if (countNotComplited) {
              client
                .patch(`/todos/${todo.id}`, { completed: true })
                .then(() => {
                  askTodos('/todos?userId=6757');
                });
            }

            break;
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
            statusComplited={statusComplited}
          />
        </header>

        <section className="todoapp__main">
          <TodoInfo
            setErrorMessage={setErrorMessage}
            todosFromServer={todosFromServer}
            askTodos={askTodos}
            setBlock={setBlock}
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
            onClick={() => clearCompleted('completed')}
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
