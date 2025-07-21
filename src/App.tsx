/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';

type Filter = '' | 'active' | 'completed';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [todos, setTodos] = useState<Todo[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filterStatus, setFilterStatus] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000); // має бути саме 3000 мс

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleFilterBy = (status: Filter) => {
    setFilterStatus(status);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId)
      .then(() =>
        setTodos(prevTodo => prevTodo.filter(todo => todo.id !== todoId)),
      )
      .catch(() => setErrorMessage('Unable to delete a todo'));
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'active') {
      return !todo.completed;
    }

    if (filterStatus === 'completed') {
      return todo.completed;
    }

    return todos;
  });

  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodo(todo.id))).then(() => {
      setTodos(prev => prev.filter(todo => !todo.completed));
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
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
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
          {/* This is a completed todo */}
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed && 'completed'}`}
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
                onClick={() => handleDeleteTodo(todo.id)}
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
                className={`filter__link ${filterStatus === '' && `selected`}`}
                data-cy="FilterLinkAll"
                onClick={e => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  e.preventDefault();
                  handleFilterBy('');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filterStatus === 'active' && `selected`}`}
                data-cy="FilterLinkActive"
                onClick={e => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  e.preventDefault();
                  handleFilterBy('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filterStatus === 'completed' && `selected`}`}
                data-cy="FilterLinkCompleted"
                onClick={e => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  e.preventDefault();
                  handleFilterBy('completed');
                }}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteCompleted}
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
        className={`notification is-danger ${!errorMessage ? 'hidden' : ''}`}
      >
        <button
          type="button"
          className="delete"
          aria-label="Close"
          data-cy="HideErrorButton"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
