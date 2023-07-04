/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterTodos } from './types/FilterTodos';
import { Header } from './components/Header/Header';
import {
  ErrorNotifications,
} from './components/ErrorNotifications/ErrorNotifications';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

const filteringTodos = (todos: Todo[], filterType: FilterTodos) => {
  switch (filterType) {
    case FilterTodos.ALL:
      return todos;
    case FilterTodos.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FilterTodos.COMPLETED:
      return todos.filter(todo => todo.completed);
    default:
      throw new Error('Unexpected type!');
  }
};

const USER_ID = 10911;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState<FilterTodos>(FilterTodos.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((err) => {
        setError(err.message || 'Smth went wrong!');
      });
  }, []);

  const deleteNotification = useCallback(() => {
    setError('');
    setTimeout(() => {
      setError('');
    }, 3000);
  }, []);

  const visibleTodos = useMemo(() => {
    const todoList = filteringTodos(todos, select);

    return todoList;
  }, [select, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          onQuery={setQuery}
          visibleTodos={visibleTodos}
        />

        {visibleTodos.length > 0 && (
          <TodoList
            visibleTodos={visibleTodos}
          />
        )}

        {todos.length > 0 && (
          <Footer
            select={select}
            onSelect={setSelect}
          />
        )}
      </div>

      {error && (
        <ErrorNotifications
          error={error}
          remove={deleteNotification}
        />
      )}
    </div>
  );
};
