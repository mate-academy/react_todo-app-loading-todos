import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';

import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterValues } from './types/FilterValues';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const getTodosAsync = async (userId: number) => {
      try {
        const receivedTodos = await getTodos(userId);

        setTodos(receivedTodos);
      } catch {
        setErrorMessage('Unable to load todos');
      }
    };

    if (user) {
      getTodosAsync(user.id);
    }
  }, [user]);

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (filterValue) {
        case FilterValues.ACTIVE:
          return !completed;

        case FilterValues.COMPLETED:
          return completed;

        default:
          return true;
      }
    });
  }, [todos, filterValue]);

  const activeTodosTotal = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const isLeftActiveTodos = activeTodosTotal === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          isLeftActiveTodos={isLeftActiveTodos}
        />
        <TodoList todos={filteredTodos} />
        {!!todos.length && (
          <Footer
            activeTodosTotal={activeTodosTotal}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
