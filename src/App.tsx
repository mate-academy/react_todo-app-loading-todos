/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10876;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    };

    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const filteredTodos = {
    all: todos,
    active: activeTodos,
    completed: completedTodos,
  };
  const visibleTodos:Todo[]
    = filteredTodos[filterType as keyof typeof filteredTodos];

  const messageDelete = document.querySelector('.delete');

  messageDelete?.addEventListener('click', () => {
    messageDelete.parentElement?.classList.add('hidden');
  });

  const handleTodosFiltering = () => {
    const filterAll = document.querySelector('.filter__link__all');
    const filterActive = document.querySelector('.filter__link__active');
    const filterCompleted = document.querySelector('.filter__link__completed');

    filterAll?.addEventListener('click', () => {
      setFilterType('all');
    });

    filterActive?.addEventListener('click', () => {
      setFilterType('active');
    });

    filterCompleted?.addEventListener('click', () => {
      setFilterType('completed');
    });
  };

  setTimeout(() => {
    messageDelete?.parentElement?.classList.add('hidden');
  }, 3000);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {
          todos.length > 0
            && (
              <section className="todoapp__main">
                {visibleTodos.map(todo => (
                  <div
                    className={classNames(
                      'todo',
                      { completed: todo.completed },
                    )}
                    key={todo.id}
                  >
                    <label className="todo__status-label">
                      <input
                        type="checkbox"
                        className="todo__status"
                        checked
                      />
                    </label>

                    <span className="todo__title">{todo.title}</span>

                    {/* Remove button appears only on hover */}
                    <button type="button" className="todo__remove">×</button>

                    {/* overlay will cover the todo while it is being updated */}
                    <div className="modal overlay">
                      <div
                        className="modal-background has-background-white-ter"
                      />
                      <div className="loader" />
                    </div>
                  </div>
                ))}
              </section>
            )
        }

        {
          todos.length > 0
            && (
              <footer className="todoapp__footer">
                <span className="todo-count">
                  {`${visibleTodos.length} items left`}
                </span>

                {/* Active filter should have a 'selected' class */}
                <nav
                  className="filter"
                  onClick={handleTodosFiltering}
                  role="presentation"
                >
                  <a
                    href="#/"
                    className={classNames(
                      'filter__link',
                      'filter__link__all',
                      { selected: filterType === 'all' },
                    )}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={classNames(
                      'filter__link',
                      'filter__link__active',
                      { selected: filterType === 'active' },
                    )}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={classNames(
                      'filter__link',
                      'filter__link__completed',
                      { selected: filterType === 'completed' },
                    )}
                  >
                    Completed
                  </a>
                </nav>

                {/* don't show this button if there are no completed todos */}
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              </footer>
            )
        }
      </div>

      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        {/* Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
