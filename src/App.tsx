/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';

import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';

import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
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
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const setLoading = (id: number, value: boolean) => {
    setLoadingIds(prev =>
      value
        ? [...prev, id]
        : prev.filter(itemId => itemId !== id),
    );
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setError('');

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');

      return;
    }

    const newTodo = {
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    };

    addTodo(newTodo)
      .then(todo => {
        setTodos(prev => [...prev, todo]);
        setNewTitle('');
      })
      .catch(() => setError('Unable to add a todo'));
  };

  const handleDelete = (todo: Todo) => {
    setLoading(todo.id, true);

    deleteTodo(todo.id)
      .then(() => {
        setTodos(prev =>
          prev.filter(item => item.id !== todo.id),
        );
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => setLoading(todo.id, false));
  };

  const handleToggle = (todo: Todo) => {
    setLoading(todo.id, true);

    updateTodo({
      ...todo,
      completed: !todo.completed,
    })
      .then(() => {
        setTodos(prev =>
          prev.map(item =>
            item.id === todo.id
              ? {
                  ...item,
                  completed: !item.completed,
                }
              : item,
          ),
        );
      })
      .catch(() => setError('Unable to update a todo'))
      .finally(() => setLoading(todo.id, false));
  };

  const clearCompleted = () => {
    setClearing(true);

    const completedTodos = todos.filter(
      todo => todo.completed,
    );

    Promise.all(
      completedTodos.map(todo => deleteTodo(todo.id)),
    )
      .then(() => {
        setTodos(prev =>
          prev.filter(todo => !todo.completed),
        );
      })
      .catch(() => setError('Unable to delete todos'))
      .finally(() => setClearing(false));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(
      todo => todo.completed,
    );

    Promise.all(
      todos.map(todo =>
        updateTodo({
          ...todo,
          completed: !allCompleted,
        }),
      ),
    )
      .then(() => {
        setTodos(prev =>
          prev.map(todo => ({
            ...todo,
            completed: !allCompleted,
          })),
        );
      })
      .catch(() => setError('Unable to update todos'));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${
                todos.every(todo => todo.completed)
                  ? 'active'
                  : ''
              }`}
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleAdd}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main">
              {visibleTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={`todo ${
                    todo.completed ? 'completed' : ''
                  }`}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo)}
                    />
                  </label>

                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                  >
                    {todo.title}
                  </span>

                  <button
                    data-cy="TodoDelete"
                    type="button"
                    className="todo__remove"
                    onClick={() => handleDelete(todo)}
                  >
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={`modal overlay ${
                      loadingIds.includes(todo.id) ||
                      clearing
                        ? 'is-active'
                        : ''
                    }`}
                  >
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer">
              <span
                data-cy="TodosCounter"
                className="todo-count"
              >
                {activeCount} items left
              </span>

              <nav
                data-cy="Filter"
                className="filters"
              >
                <a
                  data-cy="FilterLinkAll"
                  href="#/"
                  className={`filters__link ${
                    filter === 'all'
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All
                </a>

                <a
                  data-cy="FilterLinkActive"
                  href="#/active"
                  className={`filters__link ${
                    filter === 'active'
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </a>

                <a
                  data-cy="FilterLinkCompleted"
                  href="#/completed"
                  className={`filters__link ${
                    filter === 'completed'
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </a>
              </nav>

              <button
                data-cy="ClearCompletedButton"
                type="button"
                className="todoapp__clear-completed"
                disabled={
                  !todos.some(todo => todo.completed)
                }
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          error ? '' : 'hidden'
        }`}
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
