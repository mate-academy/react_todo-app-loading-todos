/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Status } from './types/Status';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 11092;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectItem] = useState(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(true);
        throw error;
      });
  }, []);

  const preparedTodos = todos.filter(todo => {
    const activeTodos = !todo.completed;
    const completedTodos = todo.completed;

    switch (selectItem) {
      case Status.ALL:
        return todos;

      case Status.ACTIVE:
        return activeTodos;

      case Status.COMPLETED:
        return completedTodos;

      default:
        throw new Error('Unable to add a todo');
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main">
          <TodoList preparedTodos={preparedTodos} />
        </section>

        {!!todos.length && (
          <Footer todos={todos} />
        )}

      </div>

      {errorMessage && (
        <div
          className={classNames(
            'notification',
            'is-danger is-light',
            'has-text-weight-normal', {
              hidden: !errorMessage,
            },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setErrorMessage(false)}
          />
          Unable to load todos
        </div>
      )}
    </div>
  );
};
