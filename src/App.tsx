/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import * as postService from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/FilterStatus';
import { getFilteredTodos } from './services/getFilteredTodos';
import { wait } from './utils/fetchClient';
import { ErrorMessages } from './types/ErrorMessages';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const filteredTodos = getFilteredTodos(todos, filterStatus);
  const remainingTodos = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const inputRef = useRef<HTMLInputElement>(null);

  function clearError() {
    wait(3000).then(() => setErrorMessage(''));
  }

  function addTodo({ title, completed, userId }: Omit<Todo, 'id'>) {
    postService.createTodo({ title, completed, userId })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.UnableToAddaTodo);
        clearError();
      });
  }

  function deleteTodo(todoId: number) {
    postService.deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos => currentTodos
          .filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.UnableToDeleteaTodo);
        clearError();
      });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    postService.getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.UnableToLoadTodos);
        clearError();
      });
  }, []);

  if (!postService.USER_ID) {
    return <UserWarning />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() !== '') {
      addTodo({
        title: todoTitle,
        completed: false,
        userId: postService.USER_ID,
      });
      setTodoTitle('');
    }
  };

  const handleChangeStatus = (todoId: number) => {
    const updatedTodos = todos.map(todo => (todo.id === todoId
      ? { ...todo, completed: !todo.completed }
      : todo));

    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find(todo => todo.id === todoId);

    if (todoToUpdate) {
      postService.updateTodo(todoToUpdate)
        .then(updatedTodo => {
          setTodos(currentTodos => currentTodos
            .map(todo => (todo.id === updatedTodo.id
              ? updatedTodo
              : todo)));
        })
        .catch(() => {
          setErrorMessage(ErrorMessages.UnableToUpdateaTodo);
          clearError();
        });
    }
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
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={handleChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <div className="todo-list" data-cy="todosList">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => handleChangeStatus(todo.id)}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>

              </div>
            ))}

            {/* overlay will cover the todo while it is being deleted or updated */}
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {remainingTodos}
              {' '}
              items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterStatus(Status.All)}
              >
                {Status.All}
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterStatus(Status.Active)}
              >
                {Status.Active}
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filterStatus === Status.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterStatus(Status.Completed)}
              >
                {Status.Completed}
              </a>
            </nav>

            {hasCompletedTodos && (
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

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};
