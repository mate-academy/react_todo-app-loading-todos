/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Filter } from './components/Filter';
import { StatusFilter } from './types/StatusFilter';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusFilter.ALL,
  );
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }

    setError(null);
    setLoading(true);
    getTodos()
      .then(todosList => setTodos(todosList))
      .catch(() => setError(ErrorMessage.NO_TODOS))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = () => {
    switch (statusFilter) {
      case StatusFilter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case StatusFilter.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleNewTodo = (todo: Todo) => {
    return setTodos(currentTodos => [...currentTodos, todo]);
  };

  const onErrorClose = useCallback(() => setError(null), []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo
            setFormError={setError}
            inputField={inputField}
            onFormSubmit={handleNewTodo}
            todos={todos}
          />
        </header>

        {todos.length > 0 && !loading && (
          <>
            <TodoList todosList={handleFilter()} />

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todos.filter(todo => !todo.completed).length + ' items left'}
              </span>

              <Filter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!todos.some(todo => todo.completed)}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <ErrorNotification error={error} handleErrorClose={onErrorClose} />
    </div>
  );
};
