import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Error } from './Error';

const USER_ID = 11546;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'All' | 'Active' | 'Completed'>(
    'All',
  );

  const handleErrorMessage = (message: string | null) => {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const filterTodos = (
    todosArray: Todo[],
    filterStatus: 'All' | 'Active' | 'Completed',
  ) => {
    return todosArray.filter((todo) => {
      if (filterStatus === 'All') {
        return true;
      }

      if (filterStatus === 'Active') {
        return !todo.completed;
      }

      return todo.completed;
    });
  };

  const changeFilterStatus = (type: 'All' | 'Active' | 'Completed') => {
    setFilterType(type);
  };

  useEffect(() => {
    setError(null);
    if (USER_ID) {
      getTodos(USER_ID)
        .then((data) => {
          setTodos(data);
        })
        .catch(() => {
          handleErrorMessage('Unable to load todos');
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
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
          {filterTodos(todos, filterType).map((todo) => (
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

              {/* overlay will cover the todo while it is being updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {todos.some((todo) => !todo.completed) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${todos.filter((todo) => !todo.completed).length} item${
                todos.filter((todo) => !todo.completed).length !== 1 ? 's' : ''
              } left`}
            </span>
            {/* Active filter should have a 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${
                  filterType === 'All' ? 'selected' : ''
                }`}
                onClick={() => changeFilterStatus('All')}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${
                  filterType === 'Active' ? 'selected' : ''
                }`}
                onClick={() => changeFilterStatus('Active')}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${
                  filterType === 'Completed' ? 'selected' : ''
                }`}
                onClick={() => changeFilterStatus('Completed')}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {todos.filter((todo) => todo.completed).length > 0 && (
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
      <Error error={error} setError={setError} />
    </div>
  );
};
