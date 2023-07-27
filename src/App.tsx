/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilterBar } from './components/TodoFilterBar';
import { TodoErrors } from './components/TodoErrors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterParams } from './types/FilterParams';

const USER_ID = 11134;

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

  const preparedTodos = getPreperedTodos(todos, filter);

  const todosCheck = todos.length > 0;

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to get todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
        throw error;
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
            setFilter={(newFilter) => setFilter(newFilter)}
          />
        )}
      </div>

      <TodoErrors
        error={errorMessage}
        setError={(newError) => setErrorMessage(newError)}
      />
    </div>
  );
};
