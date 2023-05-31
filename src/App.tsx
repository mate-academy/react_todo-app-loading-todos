/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

const USER_ID = 10586;

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<string>('All');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hideError, setHideError] = useState<boolean>(false);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const loadTodos = async () => {
    try {
      setHideError(false);

      const data = await getTodos(USER_ID);

      if ('Error' in data) {
        throw new Error('Error1');
      } else {
        setTodos(data);
      }
    } catch {
      setHideError(true);

      throw new Error('Error2');
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timerId = setTimeout(() => {
      setHideError(false);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    loadTodos();
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filterTodo = useCallback(() => {
    switch (selected) {
      case 'All':

        return todos;

      case 'Active':
        return [...todos].filter(todo => !todo.completed);

      case 'Completed':
        return [...todos].filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [selected, todos]);

  const visibleTodos = filterTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
        />

        {todos?.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              selectTodo={setSelected}
              selected={selected}
            />
          </>
        )}
        {hideError && (
          <Notification
            setHideErrorBtn={setHideError}
            hideError={hideError}
          />
        )}
      </div>
    </div>
  );
};
