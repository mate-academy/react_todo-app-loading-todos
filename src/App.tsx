/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Filter, Todo } from './types/Todo';

const USER_ID = 11572;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  // const [errored, setErrorred] = useState<boolean>(false);
  const [closeErrors, setCloseErrors] = useState<boolean>(false);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const displayedTodos = () => {
    let filteredTodos = [...todos];

    filteredTodos = filteredTodos.filter(todo => {
      if (filter === 'Active' && todo.completed) {
        return false;
      }

      if (filter === 'Completed' && !todo.completed) {
        return false;
      }

      return true;
    });

    return filteredTodos;
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditTodo(todo);
    console.log(`Todo "${todo.title}" was double-clicked`);
  };

  const handleClearCompleted = () => {
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            disabled={false}
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

          {displayedTodos().map((todo) => {
            return (
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
                    checked
                  />
                </label>

                {editTodo?.id === todo.id
                  ? (
                    <form>
                      <input
                        data-cy="TodoTitleField"
                        type="text"
                        className="todo__title-field"
                        placeholder="Empty todo will be deleted"
                        value={editTodo.title}
                      />
                    </form>
                  )
                  : (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => handleDoubleClick(todo)}
                      >
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                      >
                        ×
                      </button>
                    </>
                  )}

                {/* overlay will cover the todo while it is being updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', { selected: filter === 'All' })}
              data-cy="FilterLinkAll"
              onClick={() => setFilter('All')}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', { selected: filter === 'Active' })}
              data-cy="FilterLinkActive"
              onClick={() => setFilter('Active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: filter === 'Completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter('Completed')}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          {todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: closeErrors },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setCloseErrors(true)}
        />
        {/* show only one message at a time */}
        {false && 'Unable to load todos'}
        {false && 'Title should not be empty'}
        {false && 'Unable to add a todo'}
        {false && 'Unable to delete a todo'}
        {false && 'Unable to update a todo'}
      </div>
    </div>
  );
};

//  {/* This is a completed todo */}
//  <div data-cy="Todo" className="todo completed">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//      checked
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Completed Todo
//  </span>

//  {/* Remove button appears only on hover */}
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* overlay will cover the todo while it is being updated */}
//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is not completed */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Not Completed Todo
//  </span>
//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is being edited */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  {/* This form is shown instead of the title and remove button */}
//  <form>
//    <input
//      data-cy="TodoTitleField"
//      type="text"
//      className="todo__title-field"
//      placeholder="Empty todo will be deleted"
//      value="Todo is being edited now"
//    />
//  </form>

//  <div data-cy="TodoLoader" className="modal overlay">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>

// {/* This todo is in loadind state */}
// <div data-cy="Todo" className="todo">
//  <label className="todo__status-label">
//    <input
//      data-cy="TodoStatus"
//      type="checkbox"
//      className="todo__status"
//    />
//  </label>

//  <span data-cy="TodoTitle" className="todo__title">
//    Todo is being saved now
//  </span>

//  <button type="button" className="todo__remove" data-cy="TodoDelete">
//    ×
//  </button>

//  {/* 'is-active' class puts this modal on top of the todo */}
//  <div data-cy="TodoLoader" className="modal overlay is-active">
//    <div className="modal-background has-background-white-ter" />
//    <div className="loader" />
//  </div>
// </div>
