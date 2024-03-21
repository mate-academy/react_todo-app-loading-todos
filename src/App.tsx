/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { Filter, FilterStatus } from './components/Filter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo, TodoError } from './types';
import { filterTodos } from './utils/filterTodos';
import { countCompleted } from './utils/countCompleted';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<TodoError>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  const filteredTodos: Todo[] = filterTodos(todos, filterStatus);
  const completedTodosCount = countCompleted(todos);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {Boolean(todos.length) && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.length === completedTodosCount,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <TodoForm />
        </header>

        <TodoList todos={filteredTodos} />

        {Boolean(todos.length) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length - completedTodosCount} items left
            </span>

            <Filter
              status={filterStatus}
              handleStatusChange={setFilterStatus}
            />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification message={errorMessage} />
    </div>
  );
};
