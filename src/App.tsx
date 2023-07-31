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
  const [todos, setTodos] = useState<Todo[]>([]);

  const filtredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (selectedStatus) {
        case FilterStatus.Completed:
          return todo.completed;

        case FilterStatus.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });
  }, [selectedStatus, todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const closeError = () => {
    setErrorMessage('');
  };

  const filterOnStatus = (status: FilterStatus) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        setErrorMessage('Something wrong');
      });
  }, []);

  const activeTodosCount = todos.length - completedTodos.length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {filtredTodos.length > 0 && (
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
          {filtredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>

        {todos.length > 0 && (
          <TodoFilter
            selected={selectedStatus}
            filter={filterOnStatus}
            todosTotalAmount={activeTodosCount}
            completedTodosAmount={completedTodos.length}
          />
        )}
      </div>

      {errorMessage && (
        <Error
          message={errorMessage}
          onClose={closeError}
        />
      )}
    </div>
  );
};
