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
  const [hasActive, setHasActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasErrorMessage] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

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
    const hasNotCompleted = todos.some(todo => !todo.completed);

    setHasActive(hasNotCompleted);
  }, [todos]);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(filter, todos)
  ), [filter, todos]);

  const handleSetFilterClick = useCallback((value:Filter) => {
    setFilter(value);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header hasActive={hasActive} getData={getTodosFromServer} />

        <TodoList todos={visibleTodos} />

        {todos.length
        && <Footer currentOption={filter} setOption={handleSetFilterClick} />}

      </div>

      <ErrorNotification
        isHidden={!hasError}
        message={errorMessage}
        setIsHidden={setHasErrorMessage}
      />

    </div>
  );
};
