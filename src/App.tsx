/* eslint-disable jsx-a11y/control-has-associated-label,no-console */
import React, {
  useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { ErrorType } from './types/Error';
import { TodoInput } from './components/TodoInput';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { Error } from './components/Error';

const USER_ID = 10822;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [errorType, setErrorType] = useState('');

  const countNotCompletedTodos = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const getFilteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.ACTIVE:
          return !todo.completed;
        case Filter.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  useEffect(() => {
    setTimeout(() => {
      setErrorType(ErrorType.ADD);
    });

    getTodos(USER_ID)
      .then(setTodos)
      .catch(fetchError => console.error(`Fetch Error ${fetchError}`));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput />

        <TodoList todos={getFilteredTodos} />

        {todos.length > 0
          && (
            <TodoFooter
              filter={filter}
              setFilter={setFilter}
              itemsLeft={countNotCompletedTodos()}
            />
          )}
      </div>

      {/* Notification is shown in case of any errorType */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorType && (
        <Error
          errorType={errorType}
          setErrorType={setErrorType}
        />
      )}
    </div>
  );
};
