/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11562;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response as Todo[]);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  let remainingTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    remainingTodos = todos.filter(todo => !todo.completed).length;

    switch (filter) {
      case 'active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos.filter(todo => todo));
        break;
    }
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

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
          <TodoList todos={visibleTodos} />
        </section>

        {todos.length > 0 && (
          <Footer setFilter={setFilter} remainingTodos={remainingTodos} />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* Notification is shown in case of any error
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
