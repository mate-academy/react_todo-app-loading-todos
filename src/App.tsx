import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

enum SortBy {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  //#region States
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  const [selectedSort, setSelectedSort] = useState<SortBy>(SortBy.All);
  const [errorMessage, setErrorMessage] = useState('');

  //#endregion

  const sortList = (sort: SortBy) => {
    switch (sort) {
      case SortBy.Active:
        setSortedTodos(todos.filter(todo => !todo.completed));
        break;
      case SortBy.Completed:
        setSortedTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setSortedTodos(todos);
        break;
    }
  };

  //#region useEffect
  useEffect(() => {
    todoService
      .getTodos()
      .then(el => {
        setTodos(el);
        setErrorMessage('');
      })
      .catch(er => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
        throw er;
      });
  }, []);

  useEffect(() => {
    sortList(selectedSort);
  }, [todos, selectedSort]);

  //#endregion

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
              className={cn('todoapp__toggle-all')}
              data-cy="ToggleAllButton"
            />
          )}

          <form>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {sortedTodos.map(todo => {
            return (
              <div
                data-cy="Todo"
                className={cn('todo', { completed: todo.completed })}
                key={todo.id}
              >
                <label
                  className="todo__status-label"
                  htmlFor={`todo-status-${todo.id}`}
                >
                  <input
                    data-cy="TodoStatus"
                    id={`todo-status-${todo.id}`}
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                  {/* Add accessible text */}
                  <span className="sr-only">
                    Mark as {todo.completed ? 'incomplete' : 'complete'}
                  </span>
                </label>

                {false ? (
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={todo.title}
                    />
                  </form>
                ) : (
                  <span data-cy="TodoTitle" className="todo__title">
                    {todo.title}
                  </span>
                )}

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {false && (
                  <div data-cy="TodoLoader" className="modal overlay is-active">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    {/* eslint-enable max-len */}
                    <div className="loader" />
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: selectedSort === SortBy.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedSort(SortBy.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: selectedSort === SortBy.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedSort(SortBy.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: selectedSort === SortBy.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedSort(SortBy.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(todo => todo.completed)}
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
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
