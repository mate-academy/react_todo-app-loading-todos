/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { TodoList } from './components/TodoList';
import {
  Error, ErrorTimeout, ErrorButtonHandler, ErrorCloser,
} from './types/Error';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [needUpdate, setNeedUpdate] = useState(false);

  const [formInput, setFormInput] = useState('');

  const [selectedTodo, setSelectedTodo] = useState('All');

  const [addTodoError, setAddTodoError] = useState(false);
  const [deleteTodoError, setDeleteTodoError] = useState(false);
  const [updateTodoError, setUpdateTodoError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const updateTodos = async () => {
    await client.get<Todo[]>(`/todos?userId=${user?.id}`)
      .then(setTodosFromServer);
  };

  const allTodos = () => {
    setTodos(todosFromServer);
    setSelectedTodo('All');
  };

  const activeTodos = () => {
    setTodos(todosFromServer.filter(todo => todo.completed === false));
    setSelectedTodo('Active');
  };

  const completedTodos = () => {
    setTodos(todosFromServer.filter(todo => todo.completed === true));
    setSelectedTodo('Completed');
  };

  const allCompletedButtonHandler = async () => {
    const date = {
      completed: true,
    };

    todosFromServer.filter(todo => todo.completed === false)
      .forEach(async todo => {
        await client.patch(`/todos/${todo.id}`, date);
      });

    setNeedUpdate(true);
  };

  const buttonErrorHandler = (callback: ErrorButtonHandler) => {
    callback(false);
  };

  const errorCloser = (close: ErrorCloser) => {
    switch (close) {
      case 'deletetodo':
        setDeleteTodoError(false);
        break;
      case 'updatetodo':
        setUpdateTodoError(false);
        break;
      default:
        setAddTodoError(false);
    }
  };

  const timeoutErrorHandler = (callback: ErrorTimeout) => {
    setTimeout(() => {
      callback(false);
    }, 3000);
  };

  const errorHandler = (error: Error) => {
    switch (error) {
      case 'updateTodoError':
        setUpdateTodoError(true);
        timeoutErrorHandler(setUpdateTodoError);
        break;
      case 'deleteTodoError':
        setDeleteTodoError(true);
        timeoutErrorHandler(setDeleteTodoError);
        break;
      default:
        setAddTodoError(true);
        timeoutErrorHandler(setAddTodoError);
        break;
    }
  };

  const clearCompletedHandler = () => {
    todosFromServer.filter(todo => todo.completed === true)
      .forEach(async todo => {
        await client.delete(`/todos/${todo.id}`);
      });

    setNeedUpdate(true);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    errorCloser('addtodo');
    const date = {
      userId: user?.id,
      title: formInput,
      completed: false,
    };

    try {
      await client.post('/todos', date);
      updateTodos();
    } catch {
      errorHandler('addTodoError');
    }

    setFormInput('');
  };

  useEffect(() => {
    updateTodos();
    allTodos();

    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    setTodos(todosFromServer);
  }, [todosFromServer]);

  useEffect(() => {
    setNeedUpdate(false);
    updateTodos();
  }, [needUpdate]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todosFromServer.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className="todoapp__toggle-all active"
              onClick={allCompletedButtonHandler}
            />
          )}

          <form onSubmit={submitHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={formInput}
              onChange={(event) => setFormInput(event.target.value)}
            />
          </form>
        </header>

        <TodoList
          todos={todos}
          update={updateTodos}
          errorHandler={errorHandler}
          errorCloser={errorCloser}
        />

        {todosFromServer.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todosFromServer.length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedTodo === 'All',
                })}
                onClick={allTodos}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedTodo === 'Active',
                })}
                onClick={activeTodos}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedTodo === 'Completed',
                })}
                onClick={completedTodos}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className={classNames('todoapp__clear-completed', {
                'todoapp__clear-hidden': todos.filter(
                  todo => todo.completed === true,
                ).length === 0,
              })}
              onClick={clearCompletedHandler}
            >
              Clear completed
            </button>
          </footer>
        )}

        {addTodoError && (
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={() => {
                buttonErrorHandler(setAddTodoError);
              }}
            />
            Unable to add a todo
          </div>
        )}

        {deleteTodoError && (
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={() => {
                buttonErrorHandler(setDeleteTodoError);
              }}
            />
            Unable to delete a todo
          </div>
        )}

        {updateTodoError && (
          <div
            data-cy="ErrorNotification"
            className="notification is-danger is-light has-text-weight-normal"
          >
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              onClick={() => {
                buttonErrorHandler(setUpdateTodoError);
              }}
            />
            Unable to update a todo
          </div>
        )}

        {/* <section className="todoapp__main" data-cy="TodoList">
          <div data-cy="Todo" className="todo completed">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                defaultChecked
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">HTML</span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">CSS</span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue="JS"
              />
            </form>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">React</span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">Redux</span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
            >
              ×
            </button>

            <div data-cy="TodoLoader" className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section> */}

        {/* <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            4 items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              className="filter__link selected"
            >
              All
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              className="filter__link"
            >
              Active
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              className="filter__link"
            >
              Completed
            </a>
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer> */}
      </div>

      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
