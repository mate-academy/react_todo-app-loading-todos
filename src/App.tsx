import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoFilter } from './Components/TodoFilter';
import { TodoList } from './Components/TodoList';
import { TodoForm } from './Components/TodoForm';

const USER_ID = 11578;

type SortTypes = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortTypes>('all');

  const handleError = (err: string) => {
    setHasError(err);
    setTimeout(() => setHasError(null), 3000);
  };

  const handleSorting = (type: SortTypes) => setSortType(type);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const sortedTodos: Record<SortTypes, Todo[]> = {
    all: todos,
    completed: todos.filter(todo => todo.completed),
    active: todos.filter(todo => !todo.completed),
  };

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
              aria-label="toggle-all"
              className={`todoapp__toggle-all ${sortedTodos.completed.length === 0 ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          <TodoForm onError={handleError} addTodo={() => {}} />
        </header>

        {todos.length > 0 && <TodoList todos={sortedTodos[sortType]} />}

        {todos.length > 0 && (
          <footer
            className="todoapp__footer"
            data-cy="Footer"
          >
            <span className="todo-count" data-cy="TodosCounter">
              {`${sortedTodos.active.length} items left`}
            </span>

            <TodoFilter
              sortType={sortType}
              handleSort={(type: string) => handleSorting(type as SortTypes)}
            />
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={sortedTodos.completed.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          hasError === null ? 'hidden' : ''
        }`}
      >
        {/* eslint-disable-next-line  */}
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setHasError(null)}
        />
        {hasError}
      </div>
    </div>
  );
};
