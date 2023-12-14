/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';

const USER_ID = '12030';

function getPreparedTodos(todos: Todo[], filter: string): Todo[] {
  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  return preparedTodos;
}

function error(er: string) {
  switch (er) {
    case 'load':
      return 'Unable to load todos';
    case 'empty':
      return 'Title should not be empty';
    case 'add':
      return 'Unable to add a todo';
    case 'delete':
      return 'Unable to delete a todo';
    case 'update':
      return 'Unable to update a todo';
    default: return '';
  }
}

function todosCounter(todos: Todo[]) {
  return todos.filter(todo => !todo.completed).length;
}

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  function loadTodos() {
    setLoading(true);

    return client.get<Todo[]>(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('load');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  function addTodos() {
    // setLoading(true);

    client.post<Todo>(USER_ID, {
      userId: USER_ID,
      title: newTodo,
      completed: false,
    })
      .then(nTodo => {
        setTodos((curTodos) => [...curTodos, nTodo]);
        setNewTodo('');
      })
      .catch(() => {
        setErrorMessage('add');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setLoading(false));
  }

  const handleSabmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodos();
  };

  const visibleTodos = getPreparedTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {!loading && (
        <>
          <div className="todoapp__content">
            <header className="todoapp__header">
              {/* this buttons is active only if there are some active todos */}
              <button
                type="button"
                className={visibleTodos.some(t => !t.completed)
                  ? 'todoapp__toggle-all active'
                  : 'todoapp__toggle-all'}
                data-cy="ToggleAllButton"
              />

              {/* Add a todo on form submit */}
              <form
                onSubmit={handleSabmit}
              >
                <input
                  data-cy="NewTodoField"
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={newTodo}
                  onChange={(event) => setNewTodo(event.target.value)}
                />
              </form>
            </header>

            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <div
                  key={todo.id}
                  data-cy="Todo"
                  className={todo.completed
                    ? 'todo completed'
                    : 'todo'}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      // onChange={() => {
                    //   let choosed = todos.find(
                    //     t => t.id === todo.id).completed;

                    //   if (choosed) {
                    //     choosed = !choosed;
                    //   }
                    // }}
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
                    <div
                      className="modal-background has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            {/* Hide the footer if there are no todos */}
            {todos.length !== 0 && (
              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="TodosCounter">
                  {`${todosCounter(todos)} items left`}
                </span>

                {/* Active filter should have a 'selected' class */}
                <nav className="filter" data-cy="Filter">
                  <a
                    href="#/"
                    className={filter === 'all'
                      ? 'filter__link selected'
                      : 'filter__link'}
                    data-cy="FilterLinkAll"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </a>

                  <a
                    href="#/active"
                    className={filter === 'active'
                      ? 'filter__link selected'
                      : 'filter__link'}
                    data-cy="FilterLinkActive"
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </a>

                  <a
                    href="#/completed"
                    className={filter === 'completed'
                      ? 'filter__link selected'
                      : 'filter__link'}
                    data-cy="FilterLinkCompleted"
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </a>
                </nav>

                {/* don't show this button if there are no completed todos */}
                {visibleTodos.some(todo => todo.completed) && (
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

          {/* Notification is shown in case of any error */}
          {/* Add the 'hidden' class to hide the message smoothly */}
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
            hidden={!(errorMessage.length > 0)}
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={() => setErrorMessage('')}
            />
            {error(errorMessage)}
            <br />
          </div>
        </>
      )}
    </div>
  );
};
