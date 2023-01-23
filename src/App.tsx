/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { AuthContext } from './components/Auth/AuthContext';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const activeTodos = todos.filter(({ completed }) => !completed);
  const completedTodos = todos.filter(({ completed }) => completed);

  const user = useContext(AuthContext);
  const todoId = Math.max(...todos.map(({ id }) => id + 1));
  const isActive = !activeTodos.length && todos.length > 0;

  useEffect(() => {
    (async function () {
      if (user) {
        setTodos(await getTodos(user.id));
      }
    }());
  }, []);

  // will save to API instead
  const submitTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (

            <button
              data-cy="ToggleAllButton"
              type="button"
              className={cn('todoapp__toggle-all', {
                active: isActive,
              })}
              onClick={() => {}} // add callback
            />
          )}

          <NewTodo
            submitTodo={submitTodo}
            userId={user?.id || 0}
            todoId={todoId}
          />
        </header>

        <section
          className="todoapp__main"
          data-cy="TodoList"
        >
          <Routes>
            <Route
              path="/"
              element={<TodoList todos={todos} />}
            />

            <Route
              path="/active"
              element={<TodoList todos={activeTodos} />}
            />

            <Route
              path="/completed"
              element={<TodoList todos={completedTodos} />}
            />
          </Routes>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <Filter />

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
              onClick={() => {}} // add callback
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* change */}
      {false && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
          />

          {/* add conditions */}
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}
    </div>
  );
};
