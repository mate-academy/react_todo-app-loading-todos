import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type ErrorMessage =
  | 'Unable to load todos'
  | 'Title should not be empty'
  | 'Unable to add a todo'
  | 'Unable to delete a todo'
  | 'Unable to update a todo'
  | null;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [editing, setEditing] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);

  const showErrorMessage = (error: ErrorMessage) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    todosService
      .getTodos()
      .then(setTodos)
      .catch(() => showErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      showErrorMessage('Title should not be empty');
    }

    if (!value.trim()) {
      return;
    }

    const newTodo = {
      userId: USER_ID,
      title: value,
      completed: false,
    };

    todosService
      .createTodo(newTodo)
      .then(createdTodo => {
        setTodos(prev => [...prev, createdTodo]);
        setValue('');
      })
      .catch(() => showErrorMessage('Unable to add a todo'));
  };

  const removeTodo = (todoId: number) => {
    todosService
      .removeTodo(todoId)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(prev => prev.id !== todoId));
      })
      .catch(() => {
        showErrorMessage('Unable to delete a todo');
      });
  };

  const handleUpdate = (
    event: React.FormEvent<HTMLFormElement>,
    id: number,
  ) => {
    event.preventDefault();

    if (!newTitle) {
      removeTodo(id);

      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(prev =>
        prev.id === id ? { ...prev, title: newTitle } : prev,
      ),
    );

    setEditing(null);
  };

  const toggleCompleted = (id: number, checked: boolean) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: checked } : todo,
      ),
    );
  };

  const changeFilter = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter);
  };

  const completedTodos = todos.filter(todo => todo.completed);

  const clearCompletedTodo = () => {
    completedTodos.forEach(todo => todosService.removeTodo(todo.id));
    setTodos(prev => prev.filter(todo => !todo.completed));
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
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={event => setValue(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
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
                  onChange={event =>
                    toggleCompleted(todo.id, event.target.checked)
                  }
                />
              </label>

              {editing === todo.id ? (
                <form onSubmit={event => handleUpdate(event, todo.id)}>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={newTitle}
                    onChange={event => setNewTitle(event?.target.value)}
                  />
                </form>
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    setEditing(todo.id);
                    setNewTitle(todo.title);
                  }}
                >
                  {todo.title}
                </span>
              )}

              {/* Remove button appears only on hover */}
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => removeTodo(todo.id)}
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

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                onClick={() => changeFilter('all')}
                className={classNames('filter__link', {
                  selected: filter === 'all',
                })}
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                onClick={() => changeFilter('active')}
                className={classNames('filter__link', {
                  selected: filter === 'active',
                })}
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                onClick={() => changeFilter('completed')}
                className={classNames('filter__link', {
                  selected: filter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => clearCompletedTodo()}
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
          { hidden: errorMessage === null },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};