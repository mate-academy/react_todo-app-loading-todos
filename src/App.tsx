/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(ErrorType.DEFAULT_VALUE);
  const [filter, setFilter] = useState<Filter>('all');
  const [title, setTitle] = useState('');
  const [addingTodoId, setAddingTodoId] = useState<number | null>(null);

  const showError = (message: ErrorType) => {
    setError(message);
    setTimeout(() => setError(ErrorType.DEFAULT_VALUE), 3000);
  };

  const hideError = () => setError(ErrorType.DEFAULT_VALUE);

  const loadTodos = useCallback(() => {
    hideError();
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorType.LOAD_TODOS))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    loadTodos();
  }, [loadTodos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      showError(ErrorType.EMPTY_TITLE);

      return;
    }

    hideError();

    const tempId = Date.now();
    const newTodo: Todo = {
      id: tempId,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setAddingTodoId(tempId);
    setTitle('');

    addTodos(newTodo)
      .then(savedTodo => {
        setTodos(prev =>
          prev.map(todo => (todo.id === tempId ? savedTodo : todo)),
        );
      })
      .catch(() => showError(ErrorType.ADD_TODO))
      .finally(() => setAddingTodoId(null));
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const itemsLeft = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              disabled={todos.length === 0}
            />
          )}

          <form onSubmit={addTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={addingTodoId !== null}
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {!isLoading &&
              visibleTodos.map(todo => (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={`todo ${todo.completed ? 'completed' : ''}`}
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
                    disabled={addingTodoId === todo.id}
                  >
                    ×
                  </button>

                  {addingTodoId === todo.id && (
                    <div
                      data-cy="TodoLoader"
                      className="modal overlay is-active"
                    >
                      <div className="modal-background has-background-white-ter" />
                      <div className="loader" />
                    </div>
                  )}
                </div>
              ))}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {itemsLeft} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {error}
      </div>
    </div>
  );
};
