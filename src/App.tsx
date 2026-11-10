/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import type { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Errors from './components/Errors';
import { ErrorMessage } from './types/ErrorsMessage';


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const todosStatus = useMemo(() => {
    let unCompletedNumber = 0;
    let hasCompletedTodos = false;
    const visibleTodos: Todo[] = [];

    const isVisible = filter === Filter.Active
        ? (todo: Todo) => !todo.completed
        : filter === Filter.Completed
          ? (todo: Todo) => todo.completed
          : () => true;

    todos.forEach(todo => {
      if (todo.completed) {
        hasCompletedTodos = true;
      } else {
        unCompletedNumber++;
      }

      if (isVisible(todo)) {
        visibleTodos.push(todo);
      }
    });

    return { unCompletedNumber, hasCompletedTodos, visibleTodos, };
  }, [todos, filter]);

  useEffect(() => {
    setError(null);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => setError(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const errorTime = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(errorTime);
  }, [error]);

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={formHandler}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList todos={todosStatus.visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            unCompletedCount={todosStatus.unCompletedNumber}
            filter={filter}
            setFilter={setFilter}
            hasCompletedTodos={todosStatus.hasCompletedTodos}
          />
        )}
      </div>
      <Errors error={error} setError={setError} />
    </div>
  );
};
