/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoFooter } from './Components/TodoFooter';
import { TodoList } from './Components/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api/todos';
import { ErrorNotify } from './Components/ErrorNotify';

const USER_ID = 11137;

function getFilteredTodos(todos: Todo[], status:Status) {
  const visibleTodos = [...todos];

  return visibleTodos.filter(todo => {
    switch (status) {
      case Status.completed:
        return todo.completed;

      case Status.active:
        return !todo.completed;

      default:
        return true;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.all);
  const [handleError, setHandleError] = useState<null | string>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      }).catch(() => setHandleError('Unable to upload todos'));

    setTimeout(() => {
      setHandleError(null);
    }, 3000);
  }, []);

  const filteredTodos = getFilteredTodos(todos, status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <TodoFooter
              getStatus={setStatus}
              status={status}
              activeTodos={filteredTodos.length}
            />
          </>
        )}
      </div>

      {handleError
        && <ErrorNotify error={handleError} setError={setHandleError} />}
    </div>
  );
};
