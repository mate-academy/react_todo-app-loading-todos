import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { USER_ID } from './constants';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorType } from './types/Error';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdited] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const filterTodos = () => {
    switch (filter) {
      case Filter.ALL:
      default:
        return [...todos];
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
    }
  };

  useEffect(() => {
    const uploadTodos = async () => {
      setLoading(true);
      try {
        const uploadedTodos = await getTodos(USER_ID);

        setTodos(uploadedTodos);
      } catch (err) {
        setError(ErrorType.LOAD);
      } finally {
        setLoading(false);
      }
    };

    uploadTodos();
  }, []);

  const handleErrorHidden = () => {
    setError(ErrorType.NONE);
  };

  const filteredTodos = useMemo(() => filterTodos(), [filter, todos]);

  useEffect(
    () => {
      const timerId = setTimeout(() => setError(ErrorType.NONE), 3000);

      return () => {
        clearTimeout(timerId);
      };
    },
    [error],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header setError={setError} setLoading={setLoading} />

        <TodoList
          filteredTodos={filteredTodos}
          isEdited={isEdited}
          isLoading={isLoading}
        />

        {!!filteredTodos && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <div
        className={
          classNames(
            'notification is-danger is-light has-text-weight-normal', {
              hidden: !error,
            },
          )
        }
      >
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="delete"
          onClick={handleErrorHidden}
        />
        {error}
      </div>
    </div>
  );
};
