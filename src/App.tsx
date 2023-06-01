import React, { useCallback, useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { SelectTodo } from './types/SelectTodo';

const USER_ID = 10586;

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<string>('All');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hideError, setHideError] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setHideError(false);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const filterTodo = useCallback(() => {
    switch (selected) {
      case SelectTodo.All:

        return todos;

      case SelectTodo.Active:
        return todos.filter(todo => !todo.completed);

      case SelectTodo.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [selected, todos]);

  const loadTodos = async () => {
    try {
      setHideError(false);

      const data = await getTodos(USER_ID);

      if ('Error' in data) {
        throw new Error('Error - impossible load todo');
      } else {
        setTodos(data);
      }
    } catch {
      setHideError(true);

      throw new Error('Error 404 no connection to the server');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

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
              todoCount={todos.length}
              selectTodo={setSelected}
              selected={selected}
            />
          </>
        )}
        {hideError && (
          <Notification
            setIsHideError={setHideError}
            isHideError={hideError}
          />
        )}
      </div>
    </div>
  );
};
