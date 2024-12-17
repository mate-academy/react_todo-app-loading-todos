/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState('All');
  const [areAllCompleted, setAreAllCompleted] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    setErrorVisible(false);
    getTodos()
      .then(response => {
        setVisibleTodos(response);
      })
      .catch(() => setErrorVisible(true));
  }, []);

  useEffect(() => {
    setFooterVisible(visibleTodos.length > 0);
  }, [visibleTodos]);

  useEffect(() => {
    if (errorVisible) {
      const timer = setTimeout(() => setErrorVisible(false), 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [errorVisible]);

  useEffect(() => {
    setAreAllCompleted(visibleTodos.every(todo => todo.completed));
  }, [visibleTodos]);

  const handleToggleAllTodos = () => {
    setVisibleTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const handleToggleTodo = (todoId: number) => {
    setVisibleTodos((prevTodos: Todo[]): Todo[] =>
      prevTodos.map((todo: Todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const todosCounter: number = visibleTodos.filter(
    todo => !todo.completed,
  ).length;

  let filteredTodos = visibleTodos;

  if (filter === 'Active') {
    filteredTodos = visibleTodos.filter(todo => todo.completed === false);
  } else if (filter === 'Completed') {
    filteredTodos = visibleTodos.filter(todo => todo.completed === true);
  } else {
    filteredTodos = visibleTodos;
  }

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
            className={cn('todoapp__toggle-all', {
              active: areAllCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={() => handleToggleAllTodos()}
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

        <>
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={cn('todo', {
                  completed: todo.completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div
                    className={cn({
                      'modal-background has-background-white-ter': true,
                    })}
                  />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
          {footerVisible && (
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {todosCounter} items left
              </span>

              {/* Active link should have the 'selected' class */}
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', {
                    selected: filter === 'All',
                  })}
                  data-cy="FilterLinkAll"
                  onClick={() => {
                    setFilter('All');
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', {
                    selected: filter === 'Active',
                  })}
                  data-cy="FilterLinkActive"
                  onClick={() => {
                    setFilter('Active');
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', {
                    selected: filter === 'Completed',
                  })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => {
                    setFilter('Completed');
                  }}
                >
                  Completed
                </a>
              </nav>

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className={cn('todoapp__clear-completed', {
                  hidden: !filteredTodos.some(todo => todo.completed),
                })}
                data-cy="ClearCompletedButton"
                disabled={!filteredTodos.some(todo => todo.completed)}
                onClick={() => {
                  setVisibleTodos(prevTodos =>
                    prevTodos.filter(todo => !todo.completed),
                  );
                }}
              >
                Clear completed
              </button>
            </footer>
          )}
        </>

        {/* Hide the footer if there are no todos */}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorVisible,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setErrorVisible(false);
          }}
        />
        Unable to load todos
        {/* <br />
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
