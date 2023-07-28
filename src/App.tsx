/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilterBar } from './components/TodoFilterBar';
import { TodoErrors } from './components/TodoErrors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterParams } from './types/FilterParams';
import { USER_ID } from './utils/userId';

function getPreperedTodos(todosForFilter: Todo[], filterField: FilterParams) {
  return todosForFilter.filter(todo => {
    switch (filterField) {
      case FilterParams.active:
        return !todo.completed;
      case FilterParams.completed:
        return todo.completed;
      default:
        return todo;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState(FilterParams.all);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const preparedTodos = useMemo(() => {
    return getPreperedTodos(todos, filter);
  }, [todos, filter]);

  const clearError = () => {
    setErrorMessage('');
  };

  const applyFilter = (filterField: FilterParams) => {
    setFilter(filterField);
  };

  const todosCheck = todos.length > 0;

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to get todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <header className="todoapp__header">
        {todosCheck && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
          />
        )}

        <TodoForm />
      </header>
      <div className="todoapp__content">
        {todosCheck && <TodoList todos={preparedTodos} />}
        <div
          className={classNames('modal overlay', {
            'is-active': isLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
        {todosCheck && (
          <TodoFilterBar
            filter={filter}
            applyFilter={applyFilter}
            todos={todos}
          />
        )}
      </div>

      <TodoErrors
        error={errorMessage}
        clearError={clearError}
      />
    </div>
  );
};
