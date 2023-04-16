/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const USER_ID = 1;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTodoId, setActiveTodoId] = useState<number>(0);

  // filter the todos based on the selected filter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const handleFilterChange = (
    option: string, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setFilter(option);
  };

  const handleTodoCheck = (idTodo: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === idTodo) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodos(USER_ID);

      setTodos(todosData);
      setLoading(false);
    };

    fetchTodos();
  }, []);

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
            className={
              classNames('todoapp__toggle-all',
                { active: remainingTodos !== 0 })
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
          {/* This is a completed todo */}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTodoId(todo.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveTodoId(todo.id);
                }
              }}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleTodoCheck}
                />
              </label>

              <span className="todo__title">{todo.title}</span>

              {/* Remove button appears only on hover */}
              <button type="button" className="todo__remove">×</button>

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
        {remainingTodos !== 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              3 items left
            </span>

            {/* Active filter should have a 'selected' class */}
            <nav className="filter">
              <a
                href="#/"
                className={classNames(
                  'filter__link', { selected: filter === 'all' },
                )}
                onClick={(event) => handleFilterChange('all', event)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames(
                  'filter__link', { selected: filter === 'active' },
                )}
                onClick={(event) => handleFilterChange('active', event)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames(
                  'filter__link', { selected: filter === 'completed' },
                )}
                onClick={(event) => handleFilterChange('completed', event)}
              >
                Completed
              </a>
            </nav>

            {/* don't show this button if there are no completed todos */}
            <button type="button" className="todoapp__clear-completed">
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />
      </div>
    </div>
  );
};
