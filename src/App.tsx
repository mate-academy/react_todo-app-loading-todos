/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

const ERROR_MESSAGE = 'Unable to load todos';

export const App: React.FC = () => {
  //#region State
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>('all');

  //#endregion

  const showErrorContainer = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null); // Важливо встановити в null, а не в ""
    }, 3000);
  };

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (e) {
        showErrorContainer(ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  //#region filter

  const filteredTodos = todos.filter((todo: Todo) => {
    // const selectFilter =
    //   filter === 'all' ||
    //   (filter === 'completed' && todo.completed) ||
    //   (filter === 'active' && !todo.completed);

    // return selectFilter;
    return (
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed)
    );
  });

  const incompleteCount = todos.filter(todo => !todo.completed).length;

  const todosCompleted = todos.some(todo => todo.completed);

  //#endregion

  // Handler для зміни фільтру
  // const handleFilterChange = (newFilter: string) => {
  //   setFilter(newFilter);
  // };

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  // Handler для закриття повідомлення про помилку
  const handleHideError = () => {
    setErrorMessage(null); // Очищуємо повідомлення про помилку
  };

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
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
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

        {errorMessage && (
          <div className="error-message" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
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
            ))}
          </section>
        )}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {incompleteCount} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterChange('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterChange('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todosCompleted}
              // onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMessage ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleHideError} // Переконайтеся, що у вас є ця функція
        />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
