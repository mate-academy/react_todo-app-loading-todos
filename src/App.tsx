import { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  function loadTodos() {
    setIsLoading(true);
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const itemsText = activeTodosCount === 1 ? 'item' : 'items';

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__header">
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light ${error ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          className="delete"
          onClick={() => setError('')}
        />

        {error}
      </div>

      {isLoading && <div data-cy="TodoLoader">Loading...</div>}

      {todos.length > 0 && (
        <>
          <section className="todoapp__main">
            {visibleTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
              >
                <label>
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />

                  <span data-cy="TodoTitle">{todo.title}</span>
                </label>

                <div data-cy="TodoLoader" className="todo__loader hidden">
                  <div className="loader" />
                </div>

                <button
                  type="button"
                  className="todo__delete"
                  data-cy="TodoDelete"
                >
                  ×
                </button>
              </div>
            ))}
          </section>

          <footer className="todoapp__footer">
            <span data-cy="TodosCounter">
              {activeTodosCount} {itemsText} left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={filter === Filter.All ? 'selected' : ''}
                onClick={() => setFilter(Filter.All)}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={filter === Filter.Active ? 'selected' : ''}
                onClick={() => setFilter(Filter.Active)}
              >
                Active
              </a>

              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={filter === Filter.Completed ? 'selected' : ''}
                onClick={() => setFilter(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            <button data-cy="ClearCompletedButton" type="button">
              Clear completed
            </button>
          </footer>
        </>
      )}
    </div>
  );
};
