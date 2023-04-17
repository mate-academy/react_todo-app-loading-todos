/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 1;

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [activeTodoId, setActiveTodoId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const showErrorNotification = (error: string) => {
    setErrorMessage(error);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleCloseNotification = () => {
    setErrorMessage('');
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilterChange = (
    option: Filter, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setFilter(option);
  };

  const handleTodoCheck = (idTodo: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id === idTodo) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos(USER_ID);

        setTodos(todosData);
      } catch (error) {
        showErrorNotification('Unable to get todos');
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTodoKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>, todoId: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTodoId(todoId);
    }
  };

  const handleTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const newTodos = todos.map((todo) => {
      if (todo.id === activeTodoId) {
        return { ...todo, title: event.target.value };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button
            type="button"
            className={
              classNames('todoapp__toggle-all',
                { active: !!remainingTodos })
            }
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleTodoCheck(todo.id)}
                />
              </label>

              {activeTodoId !== todo.id ? (
                <>
                  <span
                    className="todo__title"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => handleTodoKeyDown(event, todo.id)}
                    onDoubleClick={(event) => {
                      event.preventDefault();
                      setActiveTodoId(todo.id);
                    }}
                  >
                    {todo.title}
                  </span>
                  <button type="button" className="todo__remove">×</button>
                </>
              ) : (
                <form>
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={todo.title}
                    onChange={handleTodoTitleChange}
                  />
                </form>
              )}
              {/* overlay will cover the todo while it is being updated */}
              <div
                className={classNames(
                  'modal', 'overlay', { 'is-active': activeTodoId === todo.id },
                )}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}

          {/* This todo is not completed */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span className="todo__title">Not Completed Todo</span>
            <button type="button" className="todo__remove">×</button>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {/* Hide the footer if there are no todos */}
        {
          !!remainingTodos && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {remainingTodos}
                {' '}
                items left
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                <a
                  href="#/"
                  className={classNames(
                    'filter__link', { selected: filter === Filter.All },
                  )}
                  onClick={(event) => handleFilterChange(Filter.All, event)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames(
                    'filter__link', { selected: filter === 'active' },
                  )}
                  onClick={(event) => handleFilterChange(Filter.Active, event)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames(
                    'filter__link', { selected: filter === Filter.Completed },
                  )}
                  onClick={
                    (event) => handleFilterChange(Filter.Completed, event)
                  }
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              {remainingTodos && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          )
        }
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {
        errorMessage && (
          <div
            className="notification is-danger is-light has-text-weight-normal"
          >
            {errorMessage}
            <button
              type="button"
              className="delete"
              onClick={() => handleCloseNotification}
            />
          </div>
        )
      }
    </div>
  );
};
