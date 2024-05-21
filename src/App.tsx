/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoItem } from './components/Todo';

type Sort = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<Sort>('All');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (!errorMessage) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  const handleCompltete = (id: number) => {
    const completedTodo = todos.map(todo => {
      if (todo.id === id) {
        setLoadingIds([...loadingIds, todo.id]);

        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      setTimeout(() => {
        const loading = loadingIds.filter(item => {
          return item !== todo.id;
        });

        setLoadingIds(loading);
      }, 500);

      return todo;
    });

    setTodos(completedTodo);
  };

  const sortTodos = () => {
    const filteredTodos = [...todos].filter(todo => {
      if (sortBy === 'Active') {
        return todo.completed === false;
      }

      if (sortBy === 'Completed') {
        return todo.completed === true;
      }

      return todo;
    });

    return filteredTodos;
  };

  const filteredTodos = sortTodos();

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
          {filteredTodos.map(todo => {
            return (
              <TodoItem
                todo={todo}
                handleCompltete={handleCompltete}
                loadingIds={loadingIds}
                key={todo.id}
              />
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: sortBy === 'All' })}
                data-cy="FilterLinkAll"
                onClick={() => setSortBy('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: sortBy === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSortBy('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: sortBy === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSortBy('Completed')}
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
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to load todos
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
