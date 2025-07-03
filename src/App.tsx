/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

export enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const loadTodos = () => {
    setIsLoading(true);
    setError('');
    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      showError('Title should not be empty');

      return;
    }

    const newTodo = {
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setIsLoading(true);
    createTodo(newTodo)
      .then(createdTodo => {
        setTodos([...todos, createdTodo]);
        setTitle('');
      })
      .catch(() => showError('Unable to add a todo'))
      .finally(() => setIsLoading(false));
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case TodoFilter.Active:
        return !todo.completed;
      case TodoFilter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const toggleTodo = (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };

    updateTodo(todo.id, updated)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todoItem =>
            todoItem.id === todo.id
              ? { ...todoItem, completed: !todoItem.completed }
              : todoItem,
          ),
        );
      })
      .catch(() => showError('Unable to update a todo'));
  };

  const removeTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.filter(todoItem => todoItem.id !== todoId),
        );
      })
      .catch(() => showError('Unable to delete a todo'));
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    Promise.all(
      todos.map(todo =>
        updateTodo(todo.id, { ...todo, completed: !areAllCompleted }),
      ),
    )
      .then(() => loadTodos())
      .catch(() => showError('Unable to update all todos'));
  };

  const clearCompleted = () => {
    Promise.all(
      todos
        .filter(todoItem => todoItem.completed)
        .map(todoItem => deleteTodo(todoItem.id)),
    )
      .then(() => loadTodos())
      .catch(() => showError('Unable to delete a todo'));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(t => t.completed),
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              ref={newTodoRef}
              disabled={isLoading}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading && <div className="loader" data-cy="TodoLoader" />}

          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => removeTodo(todo.id)}
              >
                ×
              </button>
              <div data-cy="TodoLoader" className="modal overlay" />
            </div>
          ))}
        </section>

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todoItem => !todoItem.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {Object.values(TodoFilter).map(filterOption => (
                <a
                  href="#/"
                  key={filterOption}
                  className={classNames('filter__link', {
                    selected: filter === filterOption,
                  })}
                  onClick={event => {
                    event.preventDefault();
                    setFilter(filterOption);
                  }}
                  data-cy={`FilterLink${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}`}
                >
                  {filterOption[0].toUpperCase() + filterOption.slice(1)}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
