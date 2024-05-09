/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import * as todosService from './api/todos';

// const ERROR_CLASSNAMES =
//   'notification is-danger is-light has-text-weight-normal';

const filterFunction = (todos: Todo[], chosenFilter: TodoStatus) => {

  switch (chosenFilter) {
    case TodoStatus.active:
      return todos.filter(todo => !todo.completed);
    case TodoStatus.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }

}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(TodoStatus.all);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([])

  const itemsLeft = todosFromServer.filter(todo => !todo.completed);

  useEffect(() => {
    todosService.getTodos()
      .then(todos => setTodosFromServer(todos))
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  useEffect(
    () => setFiltredTodos(() => filterFunction(todosFromServer, filterType)),
    [todosFromServer, filterType]
  );

  if (errorMessage) {
    setTimeout(() => setErrorMessage(null), 3000);
  };

  if (!USER_ID) {
    return <UserWarning />;
  };

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
          {/* This is a completed todo */}
          {filtredTodos
            .map(todo => (
              <div
                data-cy="Todo"
                className={todo.completed ? 'todo completed' : 'todo'}
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
        </section>

        {/* Hide the footer if there are no todos "filter__link selected"*/}
        {todosFromServer.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {itemsLeft.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  'selected': TodoStatus.all === filterType
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterType(TodoStatus.all)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  'selected': TodoStatus.active === filterType
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterType(TodoStatus.active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  'selected': TodoStatus.completed === filterType
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterType(TodoStatus.completed)}
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
        className={classNames('notification is-danger is-light has-text-weight-normal', {
          'hidden': !errorMessage
        })}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};

{
  /* <div>
  Unable to load todos
          <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
  </div> */
}

// {/* <section className="todoapp__main" data-cy="TodoList"> */ }
// {/* This is a completed todo */ }
// <div data-cy="Todo" className="todo completed">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//       checked
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Completed Todo
//   </span>

//   {/* Remove button appears only on hover */}
//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   {/* overlay will cover the todo while it is being deleted or updated */}
//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>

// {/* This todo is an active todo */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Not Completed Todo
//   </span>
//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>

// {/* This todo is being edited */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   {/* This form is shown instead of the title and remove button */}
//   <form>
//     <input
//       data-cy="TodoTitleField"
//       type="text"
//       className="todo__title-field"
//       placeholder="Empty todo will be deleted"
//       value="Todo is being edited now"
//     />
//   </form>

//   <div data-cy="TodoLoader" className="modal overlay">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>

// {/* This todo is in loadind state */ }
// <div data-cy="Todo" className="todo">
//   <label className="todo__status-label">
//     <input
//       data-cy="TodoStatus"
//       type="checkbox"
//       className="todo__status"
//     />
//   </label>

//   <span data-cy="TodoTitle" className="todo__title">
//     Todo is being saved now
//   </span>

//   <button type="button" className="todo__remove" data-cy="TodoDelete">
//     ×
//   </button>

//   {/* 'is-active' class puts this modal on top of the todo */}
//   <div data-cy="TodoLoader" className="modal overlay is-active">
//     <div className="modal-background has-background-white-ter" />
//     <div className="loader" />
//   </div>
// </div>
// {/* </section> */ }
