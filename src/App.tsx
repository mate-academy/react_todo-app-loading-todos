/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
// import { UserWarning } from './UserWarning';

const USER_ID = 11853;

function filterBy(todos: Todo[], filterValue: string) {
  let filteredTodos = todos;

  switch (filterValue) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    case 'all':
      return filteredTodos;
  }

  return filteredTodos;
}


export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    getTodos(USER_ID)
    .then(todo => setTodos(todo))
    .catch(() => {
      setErrorMessage('Unable to load todos');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000)
    })
  }, []);

  const visibleTodos = filterBy([...todos], filterValue);
  const activeItems = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setTodos={setTodos}
        />

        <TodoList
          todos={visibleTodos}
          setTodos={setTodos}
        />
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeItems.length ? (
                `${activeItems.length} items left`
              ) : (
               '0 items left'
              )}
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  'selected': filterValue === 'all'
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilterValue('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  'selected': filterValue === 'active'
                })}
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilterValue('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  'selected': filterValue === 'completed'
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilterValue('completed');
                }}
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
        className={cn('notification is-danger is-light has-text-weight-normal', {
          'hidden': !errorMessage,
        })}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
          {errorMessage}
        {/* show only one message at a time
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
