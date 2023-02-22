/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './types/Filter';
import { getVisibleTodos } from './utils/helpers';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorMessage/ErrorNotification';

const USER_ID = 6344;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasAllActive, setHasAllActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasErrorMessage] = useState(false);
  const [filterValue, setFilterValue] = useState<Filter>(Filter.ALL);

  const applyError = useCallback((message: string) => {
    setErrorMessage(message);
    setHasErrorMessage(true);
    setTimeout(() => {
      setHasErrorMessage(false);
    }, 3000);
  }, []);

  const getTodosFromServer = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      applyError('Cann\'t load data from server');
    }
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    const allAreActive = todos.every(todo => todo.completed);

    setHasAllActive(allAreActive);
  }, [todos]);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(filterValue, todos)
  ), [filterValue, todos]);

  const handleSetFilterClick = useCallback((value:Filter) => {
    setFilterValue(value);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasAllActive={hasAllActive} getData={getTodosFromServer} />

        <TodoList todos={visibleTodos} />

        {Boolean(todos.length)
        && (
          <Footer
            currentOption={filterValue}
            setOption={handleSetFilterClick}
          />
        )}

      </div>

      <ErrorNotification
        isHidden={!hasError}
        message={errorMessage}
        setIsHidden={setHasErrorMessage}
      />

    </div>
  );
};
