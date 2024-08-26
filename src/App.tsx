/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoCard } from './components/TodoCard';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [allTodos, setAllTodos] = useState<boolean>(true);
  const [activeTodos, setActiveTodos] = useState<boolean>(false);
  const [completedeTodos, setCompletedTodos] = useState<boolean>(false);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTitleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (!title) {
      setErrorMessage('Title should not be empty');
    }
  };

  const handleButtonClose = () => {
    setErrorMessage('');
  };

  const filterTodoAll = () => {
    getTodos().then(setTodos);
    setAllTodos(true);
    setActiveTodos(false);
    setCompletedTodos(false);
  };

  const filterTodoActive = () => {
    getTodos().then(todosActive => {
      setTodos(todosActive.filter(todoActive => !todoActive.completed));
    });
    setActiveTodos(true);
    setAllTodos(false);
    setCompletedTodos(false);
  };

  const filterTodoCompleted = () => {
    getTodos().then(todosComplete => {
      setTodos(todosComplete.filter(todoComplete => todoComplete.completed));
    });
    setCompletedTodos(true);
    setActiveTodos(false);
    setAllTodos(false);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: false,
              })}
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
              onChange={handleTitleSubmit}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              0 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: allTodos,
                })}
                data-cy="FilterLinkAll"
                onClick={filterTodoAll}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: activeTodos,
                })}
                data-cy="FilterLinkActive"
                onClick={filterTodoActive}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: completedeTodos,
                })}
                data-cy="FilterLinkCompleted"
                onClick={filterTodoCompleted}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              // hidden
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={handleButtonClose}
          />
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
          {errorMessage}
        </div>
      )}
    </div>
  );
};
