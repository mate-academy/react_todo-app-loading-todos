/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

type ErrorType = keyof typeof errorMessages;

const errorMessages = {
  load: 'Unable to load todos',
  empty: 'Title should not be empty',
  add: 'Unable to add a todo',
  delete: 'Unable to delete a todo',
  update: 'Unable to update a todo',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('load'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  let filteredTodos = todos;

  if (filter !== Filter.all) {
    filteredTodos = todos.filter(todo => {
      switch (filter) {
        case Filter.active:
          return !todo.completed;
        case Filter.completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList loading={loading} filteredTodos={filteredTodos} />

        {todos.length > 0 && (
          <Footer todos={todos} setFilter={setFilter} filter={filter} />
        )}
      </div>

      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${error ? '' : 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {Object.values(errorMessages)
          .filter(msg => errorMessages[error as ErrorType] === msg)
          .map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
      </div>
    </div>
  );
};
