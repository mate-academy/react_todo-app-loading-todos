/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { ErrorNotification } from './components/ErrorNotification';
import { Filters } from './types/Filters';
import { filterTodos } from './utils/todoUtils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<Filters>(Filters.All);

  const clearError = () => setError('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        clearError();
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setError('Unable to load todos');
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = filterTodos(todos, filter);
  const isToggleAllActive =
    todos.length > 0 && todos.every(todo => todo.completed);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const notCompletedTodos = todos.filter(todo => todo.completed).length === 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: isToggleAllActive })}
            data-cy="ToggleAllButton"
          />

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
                onClick={() => {}}
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

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filter === Filters.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(Filters.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filter === Filters.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(Filters.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filter === Filters.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(Filters.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={notCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorNotification error={error} clearError={clearError} />
    </div>
  );
};
