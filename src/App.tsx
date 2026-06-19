import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID, addTodo, deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

type FormValues = {
  title: string;
};

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const isLoading = (id: number) => loadingIds.includes(id);

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const onSubmit = handleSubmit(async data => {
    if (!data.title || data.title.trim() === '') {
      showError('Title should not be empty');

      return;
    }

    try {
      setError('');

      const title = data.title.trim();

      const newTodo = await addTodo({
        ...data,
        title,
      });

      setTodos(current => [...current, newTodo]);

      reset();
    } catch {
      showError('Unable to add a todo');
    }
  });

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return !todo.completed;

      case FILTERS.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const toggleTodo = (id: number) => {
    setTodos(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const shouldCompleteAll = !allCompleted;

    setTodos(current =>
      current.map(todo => ({
        ...todo,
        completed: shouldCompleteAll,
      })),
    );
  };

  const removeTodo = (id: number) => {
    setLoadingIds(prev => [...prev, id]);

    deleteTodo(id)
      .then(() => {
        setTodos(current => current.filter(todo => todo.id !== id));
      })
      .catch(() => {
        showError('Unable to delete a todo');
      });
  };

  const clearCompleted = () => {
    const completedTodo = todos.filter(todo => todo.completed);

    completedTodo.forEach(todo => {
      deleteTodo(todo.id);
    });

    setTodos(current => current.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <p>Todos count: {todos.length}</p>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={onSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              {...register('title')}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={classNames('todo', {
                completed: todo.completed,
              })}
            >
              <label
                className="todo__status-label"
                htmlFor={`todo-${todo.id}`}
                aria-label="Mark as completed"
              >
                <input
                  id={`todo-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
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

              <div
                data-cy="TodoLoader"
                className={classNames('modal overlay', {
                  'is-active': isLoading(todo.id),
                })}
              >
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

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.ALL,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter(FILTERS.ALL)}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.ACTIVE,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter(FILTERS.ACTIVE)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === FILTERS.COMPLETED,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter(FILTERS.COMPLETED)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompletedTodos}
              onClick={clearCompleted}
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
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
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
