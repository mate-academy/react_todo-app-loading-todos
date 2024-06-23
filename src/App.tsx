/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Filter, Todo } from './types/Todo';
import cn from 'classnames';
import TodoList from './components/TodosList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = useMemo(() => {
    switch (selectedFilter) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [selectedFilter, todos]);

  const handleTodoClick = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(newTodos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === '') {
      setErrorMessage('Title should not be empty');
      setIsLoading(false);
    }
  };

  const handleClearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  const handleCleanButton = () => {
    setErrorMessage('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', { active: todos })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleChange}
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} handleTodoClick={handleTodoClick} />

        {/* Hide the footer if there are no todos */}

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: selectedFilter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedFilter(Filter.ALL)}
              >
                {Filter.ALL}
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: selectedFilter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedFilter(Filter.ACTIVE)}
              >
                {Filter.ACTIVE}
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: selectedFilter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedFilter(Filter.COMPLETED)}
              >
                {Filter.COMPLETED}
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      {!isLoading && (
        <div
          data-cy="ErrorNotification"
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !errorMessage },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete hidden"
            onClick={handleCleanButton}
          />
          {/* show only one message at a time */}
          {errorMessage}
          {/* Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}
    </div>
  );
};
