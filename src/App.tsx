/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { createTodo, updateTodo, deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  type Filter = 'all' | 'active' | 'completed';

  type ErrorType = 'load' | 'empty' | 'add' | 'delete' | 'update' | null;

  const [error, setError] = useState<ErrorType>(null);

  const [filter, setFilter] = useState<Filter>('all');
  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('load'));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      setError('empty');

      return;
    }

    createTodo({
      userId: USER_ID,
      title: newTodoTitle.trim(),
      completed: false,
    })
      .then(todo => {
        setTodos(currentTodos => [...currentTodos, todo]);
        setNewTodoTitle('');
      })
      .catch(() => {
        setError('add');
      });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      })
      .catch(() => {
        setError('delete');
      });
  };

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
      })
      .catch(() => {
        setError('delete');
      });
  };

  const handleStatusChange = (todo: Todo) => {
    updateTodo(todo.id, !todo.completed)
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(currentTodo =>
            currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
          ),
        );
      })
      .catch(() => {
        setError('update');
      });
  };

  const handleToggleAll = () => {
    const newCompleted = !allCompleted;

    Promise.all(
      todos
        .filter(todo => todo.completed !== newCompleted)
        .map(todo => updateTodo(todo.id, newCompleted)),
    )
      .then(updatedTodos => {
        setTodos(currentTodos =>
          currentTodos.map(todo => {
            const updatedTodo = updatedTodos.find(
              updated => updated.id === todo.id,
            );

            return updatedTodo || todo;
          }),
        );
      })
      .catch(() => {
        setError('update');
      });
  };

  const handleEditStart = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    todo: Todo,
  ) => {
    event.preventDefault();

    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      setError('empty');

      return;
    }

    updateTodo(todo.id, todo.completed, trimmedTitle)
      .then(updatedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(currentTodo =>
            currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo,
          ),
        );

        setEditingTodoId(null);
      })
      .catch(() => {
        setError('update');
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={event => setNewTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}

          {filteredTodos.map(todo => (
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
                  onChange={() => handleStatusChange(todo)}
                />
              </label>

              {editingTodoId === todo.id ? (
                <form onSubmit={event => handleEditSubmit(event, todo)}>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    value={editingTitle}
                    onChange={event => setEditingTitle(event.target.value)}
                    onBlur={() => setEditingTodoId(null)}
                    autoFocus
                  />
                </form>
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleEditStart(todo)}
                >
                  {todo.title}
                </span>
              )}

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>

              {/* overlay will cover the todo while it is being deleted or updated */}
              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <button
              type="button"
              className="clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>

            <nav className="filter" data-cy="Filter"></nav>
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
          </footer>
        )}
      </div>
      {/* This is a completed todo */}

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'
          }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(null)}
        />
        {/* show only one message at a time */}
        {error === 'load' && 'Unable to load todos'}
        {error === 'empty' && 'Title should not be empty'}
        {error === 'add' && 'Unable to add a todo'}
        {error === 'delete' && 'Unable to delete a todo'}
        {error === 'update' && 'Unable to update a todo'}
      </div>
    </div>
  );
};
