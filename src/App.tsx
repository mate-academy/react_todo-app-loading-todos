/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos, removeTodo, updateTodo } from './api/todos';
import { Todo } from './types/Todo';

const USER_ID = 10156;

enum Error {
  LOAD = 'Unable to load a todo',
  DELETE = 'Unable to delete a todo',
  UPDATE = 'Unable to update a todo',
}

enum Category {
  All = 'all',
  Active = 'active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isError, setIsError] = useState<Error | string>('');
  const [filterCategory, setFilterCategory] = useState(Category.All);
  const filterTodos = async (category: Category) => {
    const allTodos = await getTodos(USER_ID);

    const filteredTodos = allTodos.filter(todo => {
      switch (category) {
        case Category.Active:
          return !todo.completed;
        case Category.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    setVisibleTodos(filteredTodos);
  };

  useEffect(() => {
    filterTodos(filterCategory);
  }, [filterCategory]);

  const handleError = (error: Error) => {
    setIsError(error);
    window.setTimeout(() => {
      setIsError('');
    }, 3000);
  };

  const loadTodos = async () => {
    try {
      const todos = await getTodos(USER_ID);

      setVisibleTodos(todos);
    } catch {
      handleError(Error.LOAD);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = async (todoId: number) => {
    try {
      await removeTodo(todoId);
      const filteredTodos = visibleTodos.filter(todo => todo.id !== todoId);

      setVisibleTodos(filteredTodos);
    } catch {
      handleError(Error.DELETE);
    }
  };

  const handleTodoTitle = (title: string) => {
    setTodoTitle(title);
  };

  const handleTodoUpdate = async (todoId: number, title: string) => {
    try {
      await updateTodo(todoId, title);
    } catch {
      handleError(Error.UPDATE);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line no-console
  console.log(handleTodoUpdate);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={(event) => handleTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main">
          {/* This is a completed todo */}
          {visibleTodos.map(todo => (
            <div
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being updated */}
              <div
                className="modal overlay"
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${visibleTodos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <nav className="filter">
            <a
              href="#/"
              className={classNames(
                'filter__link', { selected: filterCategory === Category.All },
              )}
              onClick={() => setFilterCategory(Category.All)}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: filterCategory === Category.Active },
              )}
              onClick={() => setFilterCategory(Category.Active)}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: filterCategory === Category.Completed },
              )}
              onClick={() => setFilterCategory(Category.Completed)}
            >
              Completed
            </a>
          </nav>

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && (
        <div className="notification is-danger is-light has-text-weight-normal">
          <button
            type="button"
            className="delete"
            onClick={() => setIsError('')}
          />
          {isError}
        </div>
      )}
    </div>
  );
};
