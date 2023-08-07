/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoFooter } from './components/TodoFooter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoErrors } from './components/TodoErrors';
import { Status } from './types/Status';

const USER_ID = 11226;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>(Status.all);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(error => {
        setError(`Error fetching todos: ${error.message}`);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const activeTodos = todos.some(todo => !todo.completed);

  const handleToggleAll = () => {
    const completedTodos = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => (
      { ...todo, completed: !completedTodos }
    ));

    setTodos(updatedTodos);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredTodos = useMemo(() => {
    switch (status) {
      case Status.completed:
        return todos.filter(todo => todo.completed);

      case Status.active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [status, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              onClick={handleToggleAll}
              className={classNames('todoapp__toggle-all', {
                active: !activeTodos,
              })}
            />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList todos={filteredTodos} />
        )}

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            setTodos={setTodos}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>

      {error && (
        <TodoErrors
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};
