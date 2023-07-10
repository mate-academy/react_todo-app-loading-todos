/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/header';
import { TodoList } from './components/todos';
import { Error } from './components/error';
import { Filter } from './components/filter';
import { FilterOptions } from './types/FilterOptions';

const USER_ID = 10995;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [
    filterMethod,
    setFilterMethod,
  ] = useState<FilterOptions>(FilterOptions.ALL);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError('Error: cannot upload todos'));
  }, []);

  useEffect(() => {
    let errorTimer: number;
    let hiddenTime: number;

    if (error) {
      hiddenTime = window.setTimeout(() => {
        setIsHidden(true);
      }, 2000);
      errorTimer = window.setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(errorTimer);
      clearTimeout(hiddenTime);
    };
  }, [error]);

  const visibleTodos: Todo[] = useMemo(() => {
    switch (filterMethod) {
      case FilterOptions.ACTIVE:
        return todos.filter((todo) => todo.completed !== true);

      case FilterOptions.COMPLETED:
        return todos.filter((todo) => todo.completed === true);

      default:
        return todos;
    }
  }, [todos, filterMethod]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <Filter filter={filterMethod} setFilter={setFilterMethod} />

            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}

        {(error) && (
          <Error error={error} setError={setError} isHidden={isHidden} />
        )}
      </div>
    </div>
  );
};
