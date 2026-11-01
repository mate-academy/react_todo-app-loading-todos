/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { useState } from 'react';
import type { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import Task from './Task';

// export interface Todo {
//   id: number;
//   userId: number;
//   title: string;
//   completed: boolean;
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [todo, setTodo] = useState<Todo>();
  // const [title, setTitle] = useState<string>('');
  // const [isComplited, setComplited] = useState<boolean>(false);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      //  console.log('dane api:', todosFromServer);
      setTodos(todosFromServer);
    });
  }, []);

  // const formHandler = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   setTodo({
  //     id: 0,
  //     userId: USER_ID,
  //     title: title,
  //     completed: isComplited,
  //   });
  // };

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
          {/* <form onSubmit={formHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.currentTarget.value)}
            />
          </form> */}
        </header>

        {todos.length > 0 && (
          <section>
            {todos.map(task => (
              <Task key={task.id} todo={task} />
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
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
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
