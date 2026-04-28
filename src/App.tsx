/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';

import { Todo } from './types/Todo';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const loadTodos = async () => {
    setError('');

    try {
      const data = await getTodos();

      setTodos(data);
    } catch {
      showError('Unable to load todos');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      showError('Title should not be empty');

      return;
    }

    try {
      const created = await addTodo({
        userId: USER_ID,
        title: title.trim(),
        completed: false,
      });

      setTodos(prev => [...prev, created]);
      setTitle('');
    } catch {
      showError('Unable to add a todo');
    }
  };

  const handleDelete = async (id: number) => {
    setProcessingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setProcessingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleToggle = async (todo: Todo) => {
    setProcessingIds(prev => [...prev, todo.id]);

    try {
      const updated = await updateTodo({
        ...todo,
        completed: !todo.completed,
      });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch {
      showError('Unable to update a todo');
    } finally {
      setProcessingIds(prev => prev.filter(i => i !== todo.id));
    }
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <form onSubmit={handleAdd}>
            <input
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            const isProcessing = processingIds.includes(todo.id);

            return (
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
                    disabled={isProcessing}
                    onChange={() => handleToggle(todo)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  data-cy="TodoDelete"
                  className="todo__remove"
                  disabled={isProcessing}
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </button>

                <div
                  data-cy="TodoLoader"
                  className={cn('modal overlay', {
                    'is-active': isProcessing,
                  })}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                data-cy="FilterLinkAll"
                className={cn('filter__link', {
                  selected: filter === 'all',
                })}
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                data-cy="FilterLinkActive"
                className={cn('filter__link', {
                  selected: filter === 'active',
                })}
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                data-cy="FilterLinkCompleted"
                className={cn('filter__link', {
                  selected: filter === 'completed',
                })}
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              data-cy="ClearCompletedButton"
              className="todoapp__clear-completed"
              disabled={!todos.some(t => t.completed)}
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
