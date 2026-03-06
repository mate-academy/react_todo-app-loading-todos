/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [filter, setFilter] = useState<Filter>('all');
  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setErrorMessage('Unable to load todos');
    }
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const activeTodosCount = activeTodos.length;
  const completedTodosCount = todos.length - activeTodosCount;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: activeTodosCount === 0 && todos.length !== 0,
            })}
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
          {/* This is a completed todo */}

          {filteredTodos.map((todo: Todo) => (
            <div
              data-cy="Todo"
              className={cn('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => {}}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              {/* Remove button appears only on hover */}
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

          {/* This todo is being edited */}
          {/*<div data-cy="Todo" className="todo">*/}
          {/*  <label className="todo__status-label">*/}
          {/*    <input*/}
          {/*      data-cy="TodoStatus"*/}
          {/*      type="checkbox"*/}
          {/*      className="todo__status"*/}
          {/*    />*/}
          {/*  </label>*/}
          {/*  /!* This form is shown instead of the title and remove button *!/*/}
          {/*  <form>*/}
          {/*    <input*/}
          {/*      data-cy="TodoTitleField"*/}
          {/*      type="text"*/}
          {/*      className="todo__title-field"*/}
          {/*      placeholder="Empty todo will be deleted"*/}
          {/*      value="Todo is being edited now"*/}
          {/*    />*/}
          {/*  </form>*/}
          {/*  <div data-cy="TodoLoader" className="modal overlay">*/}
          {/*    <div className="modal-background has-background-white-ter" />*/}
          {/*    <div className="loader" />*/}
          {/*  </div>*/}
          {/*  Title should not be empty*/}
          {/*</div>*/}

          {/* This todo is in loadind state */}
          {/*<div data-cy="Todo" className="todo">*/}
          {/*  <label className="todo__status-label">*/}
          {/*    <input*/}
          {/*      data-cy="TodoStatus"*/}
          {/*      type="checkbox"*/}
          {/*      className="todo__status"*/}
          {/*    />*/}
          {/*  </label>*/}
          {/*  <span data-cy="TodoTitle" className="todo__title">*/}
          {/*    Todo is being saved now*/}
          {/*  </span>*/}
          {/*  <button type="button" className="todo__remove" data-cy="TodoDelete">*/}
          {/*    ×*/}
          {/*  </button>*/}
          {/*  /!* 'is-active' class puts this modal on top of the todo *!/*/}
          {/*  <div data-cy="TodoLoader" className="modal overlay is-active">*/}
          {/*    <div className="modal-background has-background-white-ter" />*/}
          {/*    <div className="loader" />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: filter === 'all' })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
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
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        {/*Title should not be empty*/}
        {/*<br />*/}
        {/*Unable to add a todo*/}
        {/*<br />*/}
        {/*Unable to delete a todo*/}
        {/*<br />*/}
        {/*Unable to update a todo*/}
      </div>
    </div>
  );
};
