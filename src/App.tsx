/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { TodoSelector } from './types/TodoSelector';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';

const USER_ID = 6419;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [todoSelector, setTodoSelector] = useState<string | null>(
    TodoSelector.ALL,
  );

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        setError(new Error("Can't get todos from server!"));
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  const deleteErrorMessage = () => {
    setError(null);
  };

  const getVisibleTodos = () => {
    const needsToFilter =
      todoSelector === TodoSelector.ACTIVE ||
      todoSelector === TodoSelector.COMPLETED;

    if (!needsToFilter) {
      return todos;
    }

    return todos.filter((todo) => {
      switch (todoSelector) {
        case TodoSelector.ACTIVE:
          return !todo.completed;
        case TodoSelector.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  };

  const visibleTodos = useMemo(getVisibleTodos, [todos, todoSelector]);

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const leftTodosCount = todos.reduce((acc, todo) => {
    return !todo.completed ? acc + 1 : acc;
  }, 0);

  const handleTodoSelection = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTodoSelector(event.currentTarget.textContent);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter
            hasCompletedTodos={hasCompletedTodos}
            leftTodosCount={leftTodosCount}
            todoSelector={todoSelector}
            onChangeTodoSelector={handleTodoSelection}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {error && (
        <div
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )}
        >
          <button
            type="button"
            className="delete"
            onClick={deleteErrorMessage}
          />

          {error.message}
        </div>
      )}
    </div>
  );
};
