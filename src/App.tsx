/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { getTodos, addTodo } from './api/todos';
import { Login } from './Login';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

const USER_ID = 6846;

enum Filters {
  All,
  Active,
  Completed,
}

export const App: React.FC = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<Filters>(Filters.All);

  const completedTodosCount = todos.filter(todo => !todo.completed).length;

  const [error, setError] = useState<string>();

  const errorRef = useRef<HTMLDivElement>(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const loadTodos = async () => {
    try {
      await getTodos(USER_ID).then(res => setTodos(res));
    } catch {
      setError('unable to get todos');
    }
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === Filters.All) {
      return true;
    }

    return filter === Filters.Completed
      ? todo.completed
      : !todo.completed;
  });

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    setIsSubmit(true);
    event.preventDefault();

    if (task === '') {
      setError("Title can't be empty");
    }

    if (task) {
      addTodo({
        id: 0,
        userId: USER_ID,
        title: task,
        completed: false,
      });
    }

    setTask('');

    const timer = setTimeout(() => loadTodos(), 300);

    clearTimeout(timer);
  };

  useEffect(() => {
    loadTodos();
  }, [localStorage.getItem('email')]);

  useEffect(() => {
    const timer = setTimeout(() => {
      errorRef.current?.classList.add('hidden');
    }, 3000);

    return () => {
      clearTimeout(timer);
      errorRef.current?.classList.remove('hidden');
      setIsSubmit(false);
    };
  }, [error, isSubmit]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (!localStorage.getItem('email')) {
    return <Login />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-1">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleTodoChange}
              value={task}
            />
          </form>
        </header>

        <section className="todoapp__main">
          <div>
            {
              visibleTodos.map((
                {
                  title,
                  completed,
                  id,
                },
              ) => (
                <div
                  className={cn(
                    'todo',
                    'item-enter-done',
                    { completed },
                  )}
                  data-cy="todo"
                  key={id}
                >
                  <div className="todo__status-label">
                    <input type="checkbox" className="todo__status" />
                  </div>

                  <span className="todo__title">{title}</span>

                  <button type="button" className="todo__remove">×</button>

                  <div className="modal overlay">
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))
            }
          </div>
        </section>

        {
          todos.length > 0
          && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${completedTodosCount} items left`}
              </span>

              {/* Active filter should have a 'selected' class */}
              <nav className="filter">
                <a
                  href="#/"
                  className={cn(
                    'filter__link',
                    { selected: filter === Filters.All },
                  )}
                  onClick={() => setFilter(Filters.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn(
                    'filter__link',
                    { selected: filter === Filters.Active },
                  )}
                  onClick={() => setFilter(Filters.Active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn(
                    'filter__link',
                    { selected: filter === Filters.Completed },
                  )}
                  onClick={() => setFilter(Filters.Completed)}
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

      {/* Notification is shown in case of any error */}
      {
        error
        && (
          <div
            className={cn(
              'notification',
              'is-danger',
              'is-light',
              'has-text-weight-normal',
            )}
            ref={errorRef}
          >
            <button
              type="button"
              className="delete"
              onClick={() => setError('')}
            />

            {
              error
            }
          </div>
        )
      }
    </div>
  );
};
