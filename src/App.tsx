import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { FilterType } from './types/FilterType';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Error } from './components/Error';

const USER_ID = 6925;

export const App: React.FC = () => {
  const [errorMessage, setErrorMesage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [filterType, setFilterType] = useState(FilterType.All);

  const setError = (message: string) => {
    setErrorMesage(message);
    setHasError(true);
    setTimeout(() => setHasError(false), 3000);
  };

  const loadTodos = async () => {
    setIsloading(true);
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setError('Error occured');
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    setHasError(false);
    switch (filterType) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterType, todos]);

  const activeTodosCount = todos.reduce((count, todo) => (
    todo.completed ? count : (count + 1)
  ), 0);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            aria-label="toggle"
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: activeTodosCount > 0,
            })}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos && <TodoList todos={visibleTodos} />}

        {isLoading && <Loader />}

        {todos.length > 0 && (
          <TodoFilter
            todos={todos}
            filterType={filterType}
            setFilterType={setFilterType}
            activeTodosCount={activeTodosCount}
          />
        )}

      </div>

      <Error
        errorMessage={errorMessage}
        hasError={hasError}
        setHasError={setHasError}
      />
    </div>
  );
};
