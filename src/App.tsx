/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { Todo } from './types/Todo';
import { Completion } from './types/Completion';
import { TodoError } from './types/TodoError';
import { getTodos } from './api/todos';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { NotificationError } from './components/NotificationError';

const USER_ID = 11228;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState(TodoError.NoError);
  const [completionFilter, setCompletionFilter] = useState(Completion.All);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(TodoError.Load));
  }, []);

  const completedTodos = useMemo(() => (
    todos.filter(todo => todo.completed)
  ), [todos]);

  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  const visibleTodos = useMemo(() => {
    switch (completionFilter) {
      case Completion.Active:
        return activeTodos;
      case Completion.Completed:
        return completedTodos;
      default:
        return todos;
    }
  }, [todos, completionFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.length === completedTodos.length,
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <TodoForm />
        </header>

        <section className="todoapp__main">
          <TodoList todos={visibleTodos} />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count">
              {`${activeTodos.length} items left`}
            </span>

            {/* Active filter should have a 'selected' class */}
            <TodoFilter
              completionFilter={completionFilter}
              setCompletionFilter={setCompletionFilter}
            />

            {/* don't show this button if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              disabled={completedTodos.length === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <NotificationError
          errorMessage={errorMessage}
          clearError={() => setErrorMessage(TodoError.NoError)}
        />
      )}
    </div>
  );
};
