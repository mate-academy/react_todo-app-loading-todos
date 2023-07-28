/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoFilter } from './components/TodoFilter';
import { TodoErrors } from './components/TodoErrors';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { FilteredParams } from './types/FilteredParams';
import { getTodos } from './api/todos';
import { USER_ID } from './utils/userId';

function getPreparedTodos(todosForFilter: Todo[], filterField: FilteredParams) {
  return todosForFilter.filter(todo => {
    switch (filterField) {
      case FilteredParams.active:
        return !todo.completed;

      case FilteredParams.completed:
        return todo.completed;

      default:
        return todo;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState(FilteredParams.all);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(true);

  const unSetError = () => {
    setErrorMessage('');
  };

  // eslint-disable-next-line max-len
  const preparedTodos = useMemo(() => getPreparedTodos(todos, filter), [todos, filter]);

  const todosCheck = todos.length > 0;

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable getting todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setLoader(false));
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

        <form>
          <input
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <div className="todoapp__content">
        {todosCheck && <TodoList todos={preparedTodos} />}
        <div
          className={classNames('modal overlay', {
            'is-active': loader,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
        {todosCheck && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            todos={todos}
          />
        )}
      </div>

      <TodoErrors
        error={errorMessage}
        setError={unSetError}
      />
    </div>
  );
};
