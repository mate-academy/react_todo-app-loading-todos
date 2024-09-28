/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'completed'>(
    'all',
  );

  const hasCompleted = fetchedTodos.find(todo => todo.completed)?.completed;

  const numOfActiveTodos = todos.filter(todo => !todo.completed).length;
  const todoCounterTitle =
    (numOfActiveTodos !== 1
      ? `${numOfActiveTodos} items`
      : `${numOfActiveTodos} item`) + ' left';

  const errorMessageHandler = (er: Error) => {
    setIsHidden(false);
    setErrorMessage(er.message);
    setTimeout(() => {
      setIsHidden(true);
    }, 3000);
  };
  //
  // <br />
  // Title should not be empty
  // <br />
  // Unable to add a todo
  // <br />
  // Unable to delete a todo
  // <br />
  // Unable to update a todo

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(serverTodos => {
        setTodos(serverTodos);
        setFetchedTodos(serverTodos);
      })
      .catch(errorMessageHandler);
  }, []);

  useEffect(() => {
    let filteredTodos = todos;

    if (filterBy !== 'all') {
      filteredTodos = todos.filter(todo =>
        filterBy === 'active' ? !todo.completed : todo.completed,
      );
    }

    setFetchedTodos([...filteredTodos]);
  }, [filterBy, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {!!todos.length && (
          <>
            <TodoList renderedList={fetchedTodos} />

            {/* Hide the footer if there are no todos */}
            {!!todos.length && (
              <Footer
                counterTitle={todoCounterTitle}
                filterBy={filterBy}
                setFilter={setFilterBy}
                numActive={numOfActiveTodos}
                completed={hasCompleted}
              />
            )}
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: isHidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setIsHidden(true)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
