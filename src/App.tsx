/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client as fetchClient } from './utils/fetchClient';
import { Todo } from './types/Todo';
//import { set } from 'cypress/types/lodash';
//import { set } from 'cypress/types/lodash';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line
  useEffect(() => {
    fetchClient
      .get(`/todos?userId=${USER_ID}`)
      .then((data: Todo[]) => setTodos(data))
      .catch(() => setError(true));
  }, []);

  // eslint-disable-next-line
  console.log(todos);

  // eslint-disable-next-line
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleDelete = (id: number) => {
    setDeletingId(id);

    setTimeout(() => {
      fetchClient
        .delete(`/todos/${id}`)
        .then(() => {
          setTodos(prev => prev.filter(todo => todo.id !== id));
        })
        .catch(() => setError(true))
        .finally(() => setDeletingId(null));
    }, 500);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.trim()) {
      setError(true);

      return;
    }

    // eslint-disable-next-line
    console.log('Adding todo:', newTodo);

    const newTodoObj: Omit<Todo, 'id'> = {
      userId: USER_ID,
      title: newTodo.trim(),
      completed: false,
    };

    setTimeout(() => {
      fetchClient
        .post<Todo>('/todos', newTodoObj)
        .then(createdTodo => {
          setTodos(prev => [...prev, createdTodo]);
          setNewTodo('');
        })
        .catch(() => setError(true));
    }, 500);
  };

  const handleToggle = (todo: Todo) => {
    setTimeout(() => {
      fetchClient
        .patch<Todo>(`/todos/${todo.id}`, { completed: !todo.completed })
        .then(updatedTodo => {
          setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
        })
        .catch(() => setError(true));
    }, 500);
  };

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
          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
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
                  onChange={() => handleToggle(todo)}
                />
              </label>

              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>

              {deletingId === todo.id && (
                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active link should have the 'selected' class */}
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

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!error ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError(false)}
        />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
