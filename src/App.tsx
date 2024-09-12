import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [error, setError] = useState('');
  const cancelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const filteredTodos = () => {
    switch (filter) {
      case Filter.active:
        return todos.filter(todo => !todo.completed);

      case Filter.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const memorizedTodos = useMemo(filteredTodos, [filter, todos]);
  const todosCounter = todos.reduce(
    (prev, current) => prev + +!current.completed,
    0,
  );

  const handleCancel = () => {
    if (cancelRef.current) {
      cancelRef.current.classList.add('hidden');
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.filter(todo => todo.completed).length > 0,
            })}
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={memorizedTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todosCounter} items left`}
            </span>

            <TodoFilter setFilter={setFilter} filter={filter} />

            {todos.filter(todo => todo.completed).length > 0 && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: error.length === 0,
          },
        )}
        ref={cancelRef}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCancel}
        />
        {error}
      </div>
    </div>
  );
};
