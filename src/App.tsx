/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

function getFilter(todos: Todo[], sortField: SortType) {
  switch (sortField) {
    case SortType.Active:
      return todos.filter(todo => !todo.completed);
    case SortType.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState(SortType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const activeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    if (activeInput.current) {
      activeInput.current.focus();
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const sortedTodos = getFilter(todos, sortField);

  const everyTodosCompleted = todos.every(todo => todo.completed);

  const oneTodoCompleted = todos.find(todo => todo.completed);

  const activeTodos = todos.reduce(
    (acc, todo) => (todo.completed ? acc : acc + 1),
    0,
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${everyTodosCompleted && 'active'}`}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={activeInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {sortedTodos.map(todo => (
            <div
              data-cy="Todo"
              className={`todo ${todo.completed && 'completed'}`}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
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

              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${sortField === SortType.All && 'selected'}`}
                data-cy="FilterLinkAll"
                onClick={() => setSortField(SortType.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${sortField === SortType.Active && 'selected'}`}
                data-cy="FilterLinkActive"
                onClick={() => setSortField(SortType.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${sortField === SortType.Completed && 'selected'}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setSortField(SortType.Completed)}
              >
                Completed
              </a>
            </nav>

            {oneTodoCompleted && (
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal
        ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
