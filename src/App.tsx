/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [isError, setIsError] = useState(false);
  const [todosFilterBy, setTodosFilterBy] = useState<Status>(Status.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setIsError(true);
        throw error;
      });
  }, []);

  const preparedTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (todosFilterBy) {
        case Status.ALL:
          return todos;

        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        default:
          throw new Error('Unable to add a todo');
      }
    });
  }, [todosFilterBy, todos]);

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
          <Footer
            todos={todos}
            selectItem={todosFilterBy}
            setSelectItem={setTodosFilterBy}
          />
        )}

      </div>

      {isError && (
        <div
          className={classNames(
            'notification',
            'is-danger is-light',
            'has-text-weight-normal', {
            hidden: !isError,
          },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={() => setIsError(false)}
          />
          Unable to load todos
        </div>
      )}
    </div>
  );
};
