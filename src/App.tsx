/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';

const USER_ID = 12037;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(
    () => {
      getTodos(USER_ID)
        .then((dataFromServer) => {
          setTodos(dataFromServer);
        });
    },
    [],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

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
          <TodoList
            todos={todos}
          />
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
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

          {/* don't show this button if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      {/*</div>*/}

      {/*/!* Notification is shown in case of any error *!/*/}
      {/*/!* Add the 'hidden' class to hide the message smoothly *!/*/}
      {/*<div*/}
      {/*  data-cy="ErrorNotification"*/}
      {/*  className="notification is-danger is-light has-text-weight-normal"*/}
      {/*>*/}
      {/*  <button data-cy="HideErrorButton" type="button" className="delete" />*/}
      {/*  /!* show only one message at a time *!/*/}
      {/*  Unable to load todos*/}
      {/*  <br />*/}
      {/*  Title should not be empty*/}
      {/*  <br />*/}
      {/*  Unable to add a todo*/}
      {/*  <br />*/}
      {/*  Unable to delete a todo*/}
      {/*  <br />*/}
      {/*  Unable to update a todo*/}
      </div>
    </div>
  );
};
