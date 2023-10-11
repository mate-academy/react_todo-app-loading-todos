/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './Components/TodoList/TodoList';

// const USER_ID = 11569;
const USER_ID = 1;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        setError('Unable to load todos');

        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  const displayTodos = useMemo(() => {
    return todos.filter(todo => {
      if (statusFilter === 'active' && todo.completed) {
        return false;
      }

      if (statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });
  }, [statusFilter, todos]);

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

        <TodoList todos={displayTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0
         && (
           <footer className="todoapp__footer" data-cy="Footer">
             <span className="todo-count" data-cy="TodosCounter">
               {todos.filter(todo => !todo.completed).length}
               {' '}
               items left
             </span>

             {/* Active filter should have a 'selected' class */}
             <nav className="filter" data-cy="Filter">
               <a
                 href="#/"
                 className={`filter__link ${statusFilter === 'all' ? 'selected' : ''}`}
                 data-cy="FilterLinkAll"
                 onClick={() => setStatusFilter('all')}
               >
                 All
               </a>

               <a
                 href="#/active"
                 className={`filter__link ${statusFilter === 'active' ? 'selected' : ''}`}
                 data-cy="FilterLinkActive"
                 onClick={() => setStatusFilter('active')}
               >
                 Active
               </a>

               <a
                 href="#/completed"
                 className={`filter__link ${statusFilter === 'completed' ? 'selected' : ''}`}
                 data-cy="FilterLinkCompleted"
                 onClick={() => setStatusFilter('completed')}
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
         )}

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error && 'hidden'}`}
      >

        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />

        {error}
      </div>

      {/* show only one message at a time */}
      {/* {errorUnableToLoad && <p>Unable to load todos</p>}
        {errorUnableToLoad && <p>Title should not be empty</p>}
        {errorUnableToLoad && <p>Unable to add a todo</p>}
        {errorUnableToLoad && <p>Unable to delete a todo</p>}
        {errorUnableToLoad && <p>Unable to update a todo</p>} */}

    </div>
  );
};
