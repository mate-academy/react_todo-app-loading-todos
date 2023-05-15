/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorType } from './types/Error';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/FilterConditions';

const USER_ID = 10304;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState<ErrorType>(ErrorType.None);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const uploadTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const uploadedTodos = await getTodos(USER_ID);

      setTodos(uploadedTodos);
    } catch (err) {
      seterror(ErrorType.Load);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    uploadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
      default:
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    const timerId = setTimeout(() => seterror(ErrorType.None), 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  const handleErrorNotification = useCallback(() => {
    seterror(ErrorType.None);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={filteredTodos}
          isLoading={isLoading}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onChangeFilter={setFilter}
          />
        )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: error === ErrorType.None,
        },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={handleErrorNotification}
        />
        {error}
      </div>
    </div>
  );
};
