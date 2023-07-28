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

const USER_ID = 11139;

function getPreparedTodos(todosForFilter: Todo[], filterField: FilteredParams) {
  return todosForFilter.filter(todo => {
    switch (filterField) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState(FilteredParams.all);
  const [errorMessage, setErrorMesage] = useState('');

  // eslint-disable-next-line max-len
  const preparedTodos = useMemo(() => getPreparedTodos(todos, filter), [todos, filter]);

  const todosCheck = todos.length > 0;

  useEffect(() => {
    setErrorMesage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMesage('Unable getting todos');
        setTimeout(() => {
          setErrorMesage('');
        }, 3000);
      });
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
        {todosCheck && (
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <TodoErrors
        error={errorMessage}
        setError={setErrorMesage}
      />
    </div>
  );
};
