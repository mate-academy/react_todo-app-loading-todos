/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectFilter, setSelectFilter] = useState('');
  const location = useLocation();

  function filterTodos(list: Todo[], filterBy: string) {
    switch (filterBy) {
      case '#/':
        return list;
      case '#/active':
        return list.filter(todo => !todo.completed);
      case '#/completed':
        return list.filter(todo => todo.completed);
      default:
        return list;
    }
  }

  const filteredTodos = filterTodos(todos, location.hash);

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todosLeft = todos.filter(todo => !todo.completed);

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
        {todos.length > 0 && (
          <React.Fragment>
            <section className="todoapp__main" data-cy="TodoList">
              {/* This is a completed todo */}
              {/* <div data-cy="Todo" className="todo completed">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  Completed Todo
                </span> */}

              {/* Remove button appears only on hover */}
              {/* <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button> */}

              {/* overlay will cover the todo while it is being deleted or updated */}
              {/* <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}

              {/* This todo is an active todo */}
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  className={classNames('todo', { completed: todo.completed })}
                  key={todo.id}
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

                  <div data-cy="TodoLoader" className="modal overlay">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
              {/* This todo is being edited */}
              {/* <div data-cy="Todo" className="todo">
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label> */}

              {/* This form is shown instead of the title and remove button */}
              {/* <form>
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
              </div> */}

              {/* This todo is in loadind state */}
              {/* <div data-cy="Todo" className="todo">
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

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button> */}

              {/* 'is-active' class puts this modal on top of the todo */}
              {/* <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div> */}
            </section>

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todosLeft.length} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: selectFilter === '#/' || !selectFilter,
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => setSelectFilter('#/')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: selectFilter === '#/active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => setSelectFilter('#/active')}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: selectFilter === '#/completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setSelectFilter('#/completed')}
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
          </React.Fragment>
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
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
          className={classNames('delete')}
        />
        {/* show only one message at a time */}
        {errorMessage === 'Unable to load todos' && 'Unable to load todos'}
        <br />
        {errorMessage === 'Title should not be empty' &&
          'Title should not be empty'}
        <br />
        {errorMessage === 'Unable to add a todo' && 'Unable to add a todo'}
        <br />
        {errorMessage === 'Unable to delete a todo' &&
          'Unable to delete a todo'}
        <br />
        {errorMessage === 'Unable to delete a todo' &&
          'Unable to update a todo'}
      </div>
    </div>
  );
};
