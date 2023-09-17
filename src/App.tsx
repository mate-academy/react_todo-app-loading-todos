/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import * as todoService from './api/todos';
import { USER_ID } from './api/Personal_Id';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

  const completedTodosCount = todos.reduce((acc, todo) => {
    return todo.completed ? acc + 1 : acc;
  }, 0);

  const activeTodosCount = todos.length - completedTodosCount;

  const visibleTodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
      default:
        return true;
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    todoService.addTodos({
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    })
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(() => setErrorMessage('Unable to add a todo'));

    setTitle('');
  };

  const deleteTodo = (todoId: number) => {
    todoService.deletePost(todoId)
      .then(() => setTodos([
        ...todos.filter(todo => todo.id !== todoId),
      ]))
      .catch(() => setErrorMessage('Unable to delete the todo'));
  };

  useEffect(() => {
    todoService.getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load a todo'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: completedTodosCount !== 0,
              })}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
          deleteTodo={deleteTodo}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodosCount} items left`}
            </span>

            <nav className="filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: status === Status.All,
                })}
                onClick={() => setStatus(Status.All)}

              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: status === Status.Active,
                })}
                onClick={() => setStatus(Status.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: status === Status.Completed,
                })}
                onClick={() => setStatus(Status.Completed)}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className={classNames('todoapp__clear-completed', {
                'todoapp__clear-completed--hidden': completedTodosCount === 0,
              })}
            // onClick={deleteCompletedTodo}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        className={errorMessage
          ? 'notification is-danger is-light has-text-weight-normal'
          : 'notification is-danger is-light has-text-weight-normal hidden'}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />

        {errorMessage}
      </div>
    </div>
  );
};
