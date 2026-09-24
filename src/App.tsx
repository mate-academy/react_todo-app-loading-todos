// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import * as client from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Filters } from './types/Filters';

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const [error, setError] = useState<string>('');

  const [todos, setTodos] = useState<Todo[] | undefined>();
  const [query, setQuery] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<Filters>('all');

  useEffect(() => {
    client
      .getTodos()
      .then(list => setTodos(list))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  function createTodo(title: string): Omit<Todo, 'id'> {
    return {
      userId: client.USER_ID,
      title: title,
      completed: false,
    };
  }

  const filteredList = (list: Todo[]) => {
    return [...list].filter(item => {
      switch (currentFilter) {
        case 'active':
          return item.completed === false;
        case 'completed':
          return item.completed === true;
        case 'all':
        default:
          return true;
      }
    });
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
          <form
            onSubmit={event => {
              event.preventDefault();
              client
                .addTodo(createTodo(query))
                .then(newTodo =>
                  setTodos(previousTodos =>
                    previousTodos ? [...previousTodos, newTodo] : [newTodo],
                  ),
                )
                .catch(() => setError('Unable to add a todo'));
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>
        </header>

        {todos && todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredList(todos).map(todo => (
              <div
                data-cy="Todo"
                className={cn('todo', { completed: todo.completed })}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={event => {
                      client
                        .editTodo(todo.id, {
                          ...todo,
                          completed: event.target.checked,
                        })
                        .then(updatedTodo =>
                          setTodos(previusTodos =>
                            previusTodos?.map(item => {
                              if (item.id === updatedTodo.id) {
                                return updatedTodo;
                              }

                              return item;
                            }),
                          ),
                        );
                    }}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() =>
                    client
                      .deleteTodo(todo.id)
                      .then(() => {
                        setTodos(previusTodos =>
                          previusTodos?.filter(item => item.id !== todo.id),
                        );
                      })
                      .catch(() => setError('Unable to delete a todo'))
                  }
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => todo.completed === false).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: currentFilter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setCurrentFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: currentFilter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setCurrentFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: currentFilter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setCurrentFilter('completed')}
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
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: error === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {/* show only one message at a time */}
        {error}
      </div>
    </div>
  );
};
