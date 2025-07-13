/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Filter } from './types/Filter';

function getTodos(todos: Todo[], filter: Filter) {
  if (!todos) {
    return [];
  }

  switch (filter) {
    case Filter.All:
      return todos;

    case Filter.Active:
      return todos.filter(todo => !todo.completed);

    case Filter.Completed:
      return todos.filter(todo => todo.completed);
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [todoFilter, setTodoFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');

  const visibleTodos: Todo[] = todos ? getTodos(todos, todoFilter) : [];

  async function loadTodos() {
    try {
      const todosFromServer = await client.get<Todo[]>(
        `/todos?userId=${USER_ID}`,
      );

      setTodos(todosFromServer);
    } catch (e) {
      setErrorMessage('Unable to load todos');
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {visibleTodos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${visibleTodos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {todos &&
            visibleTodos.map(todo => (
              <div
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
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

                {/* Remove button appears only on hover */}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                {/* overlay will cover the todo while it is being deleted or updated */}
                <div data-cy="TodoLoader" className="modal overlay">
                  {/* eslint-disable-next-line max-len */}
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos && todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${todoFilter === Filter.All ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setTodoFilter(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${todoFilter === Filter.Active ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setTodoFilter(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${todoFilter === Filter.Completed ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setTodoFilter(Filter.Completed)}
              >
                Completed
              </a>
            </nav>
            {/* this button should be disabled if there are no completed todos */}
            {todos && todos.some(todo => todo.completed) && (
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
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
