/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

enum Filters {
  all = 'All',
  completed = 'Completed',
  active = 'Active',
}

enum Errors {
  loadTodos = 'Unable to load todos',
  emptyTitle = 'Title should not be empty',
  addTodo = 'Unable to add a todo',
  deleteTodo = 'Unable to delete a todo',
  updateTodo = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [prepariedTodos, setPrepariedTodos] = useState<Todo[]>([]);

  const [filterMethod, setFilterMethod] = useState(Filters.all);
  const [errorMessage, setErrorMessage] = useState('');

  const itemsLeft = prepariedTodos.filter(todo => todo.completed === false);

  useEffect(() => {
    const loadingTodos = async () => {
      try {
        const todos = await getTodos();

        setPrepariedTodos(todos);
      } catch (err) {
        setErrorMessage(Errors.loadTodos);
      }
    };

    loadingTodos();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const errorTimer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(errorTimer);
    }
  }, [errorMessage]);

  const getFilteredTodos = (todos: Todo[], query: string) => {
    let filteredTodos = [...todos];

    switch (query) {
      case Filters.active:
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;
      case Filters.completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;
      default:
        break;
    }

    return filteredTodos;
  };

  const filteredTodos = getFilteredTodos(prepariedTodos, filterMethod);

  if (!USER_ID) {
    return <UserWarning />;
  }

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

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
          <>
            {/* This todo is an active todo
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          This todo is being edited
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            This form is shown instead of the title and remove button
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          This todo is in loadind state
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>

            'is-active' class puts this modal on top of the todo
            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div> */}
          </>
        </section>

        {/* Hide the footer if there are no todos */}
        {prepariedTodos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemsLeft.length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterMethod === Filters.all,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterMethod(Filters.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterMethod === Filters.active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterMethod(Filters.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterMethod === Filters.completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterMethod(Filters.completed)}
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

      <div
        data-cy="ErrorNotification"
        className={classNames(
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
