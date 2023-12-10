/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Status } from './types/Statuses';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11980;

const applyFilter = (todos: Todo[], filter: Status) => {
  const conditions = {
    [Status.All]: () => {
      return todos;
    },
    [Status.Active]: () => {
      return todos.filter(todo => !todo.completed);
    },
    [Status.Completed]: () => {
      return todos.filter(todo => todo.completed);
    },
  };

  return conditions[filter]();
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState<Errors | ''>('');

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(Errors.LoadError));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = applyFilter(todos, filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos[0] && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />

          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={filteredTodos} />

        {todos[0] && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification error={errorMessage} setError={setErrorMessage} />
    </div>
  );
};
