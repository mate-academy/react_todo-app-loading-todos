/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterType } from './types/FilterType';

const createNewTodo = (todos: Todo[], title: string, userId: number): Todo => {
  const newId =
    todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  return {
    id: newId,
    userId,
    title,
    completed: false,
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [toggleAllButtonIsActive, setToggleAllButtonIsActive] = useState(
    todos.every(todo => todo.completed === true),
  );

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const uncompletedTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    setToggleAllButtonIsActive(todos.every(todo => todo.completed));
  }, [todos]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleFilter = (newFilter: FilterType) => setFilter(newFilter);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setError('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (query.trim() === '') {
      setError('Title should not be empty');

      return;
    }

    const newTodo = createNewTodo(todos, query, USER_ID);

    setTodos(prevTodos => [...(prevTodos || []), newTodo]);
    setQuery('');
  };

  const handleAllTodoCompleted = () => {
    setTodos(
      todos.map(todo => ({ ...todo, completed: !toggleAllButtonIsActive })),
    );
  };

  const handleClearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: toggleAllButtonIsActive,
              })}
              data-cy="ToggleAllButton"
              onClick={handleAllTodoCompleted}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </header>

        {todos && <TodoList todos={filteredTodos} setTodos={setTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodosCount} items left
            </span>

            <TodoFilter filter={filter} handleFilter={handleFilter} />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.length === uncompletedTodosCount}
              onClick={handleClearCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error === 'Unable to load todos' && 'Unable to load todos'}
        {error === 'Title should not be empty' && 'Title should not be empty'}
        {error === 'Unable to add a todo' && 'Unable to add a todo'}
        {error === 'Unable to delete a todo' && 'Unable to delete a todo'}
        {error === 'Unable to update a todo' && 'Unable to update a todo'}
      </div>
    </div>
  );
};
