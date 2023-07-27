/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Error } from './components/Error';
import { TodoFilter } from './components/TodoFilter';
import { TodoItem } from './components/TodoItem';
import { getTodos } from './api/todos';
import { Todo, FilterStatus } from './types/Todo';

const USER_ID = 11220;

export const App: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [todosContent, setTodosContent] = useState<Todo[]>([]);

  const todos = useMemo(() => {
    return todosContent.filter(todo => {
      switch (selectedStatus) {
        case FilterStatus.Completed:
          return todo.completed;

        case FilterStatus.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  }, [selectedStatus, todosContent]);

  const completeTodo = useMemo(() => {
    return todosContent.filter(todo => todo.completed);
  }, [todosContent]);

  const closeError = () => {
    setErrorMessage('');
  };

  const filterOnStatus = (status: FilterStatus) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodosContent(response);
      })
      .catch(err => {
        setErrorMessage(err);
      });
  }, []);

  const amount = todosContent.length - completeTodo.length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className="todoapp__toggle-all active"
            />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main">
          {todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>

        {todosContent.length > 0 && (
          <TodoFilter
            selected={selectedStatus}
            filter={filterOnStatus}
            todosTotalAmount={amount}
            completedTodosAmount={completeTodo.length}
          />
        )}
      </div>

      {errorMessage && (
        <Error
          message={errorMessage}
          whenClose={closeError}
        />
      )}
    </div>
  );
};
