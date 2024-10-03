/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getTodos()
      .then(todoList => {
        setTodos(todoList);
      })
      .catch(error => {
        console.error(error);
        setErrorText('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    switch (filterBy) {
      case 'Active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  }, [filterBy, todos]);

  useEffect(() => {
    if (errorText) {
      const timer = setTimeout(() => {
        setErrorText('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorText]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const notCompletedTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${notCompletedTodosCount} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                onClick={() => setFilterBy('All')}
                className={classNames(
                  'filter__link',
                  // eslint-disable-next-line prettier/prettier
                  { selected: filterBy === 'All' }
                )}
              >
                All
              </a>
              <a
                href="#/active"
                className={classNames(
                  'filter__link',
                  // eslint-disable-next-line prettier/prettier
                  { selected: filterBy === 'Active' }
                )}
                data-cy="FilterLinkActive"
                onClick={() => setFilterBy('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link',
                  // eslint-disable-next-line prettier/prettier
                  { selected: filterBy === 'Completed' }
                )}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterBy('Completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
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

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorText },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorText('')}
        />
        Unable to load todos
        {/* show only one message at a time */}
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
    </div>
  );
};
