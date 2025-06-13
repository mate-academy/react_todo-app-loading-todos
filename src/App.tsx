/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoFilters } from './types/TodoFilters';
import { ErrorMessage } from './types/ErrorMessage';

const getVisibleTodos = (todos: Todo[], todoFilter: TodoFilters) => {
  let visibleTodos = [...todos];

  if (todoFilter !== TodoFilters.All) {
    switch (todoFilter) {
      case TodoFilters.Completed:
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;
      case TodoFilters.Active:
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.WithoutError,
  );
  const [todoFilter, setTodoFilter] = useState<TodoFilters>(TodoFilters.All);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setErrorMessage(ErrorMessage.UnableLoadTodos))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage(ErrorMessage.WithoutError);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const visibleTodos: Todo[] = getVisibleTodos(todos, todoFilter);

  const activeTodos = todos.filter(todo => !todo.completed);

  const visibleFooter = todos.length !== 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {visibleFooter && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {visibleTodos.map(todo => {
          return (
            <section key={todo.id} className="todoapp__main" data-cy="TodoList">
              <div
                data-cy="Todo"
                className={cn('todo', { 'todo completed': todo.completed })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => {}}
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
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            </section>
          );
        })}

        {visibleFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.entries(TodoFilters).map(([text, value]) => (
                <a
                  key={value}
                  href={`#/${value !== 'all' ? value : ''} `}
                  className={cn('filter__link', {
                    'filter__link selected': todoFilter === value,
                  })}
                  data-cy={`FilterLink${text}`}
                  onClick={() => setTodoFilter(value)}
                >
                  {text}
                </a>
              ))}
            </nav>

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
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: loading || !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.WithoutError)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
