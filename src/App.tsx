import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodosList } from './components/TodoList/TodosList';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorNotification, setErrorNotification] = useState(false);
  const [filterType, setFilterType] = useState(FilterType.All);
  const user = useContext(AuthContext);

  useEffect(() => {
    const loadTodos = async (userId: number) => {
      try {
        setTodos(await getTodos(userId));
      } catch {
        setErrorNotification(true);
      }
    };

    loadTodos(user?.id || 0);
  }, []);

  const filteredTodos = useMemo(() => todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return true;
    }
  }), [todos]);

  const activeAllTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const activeTodos = activeAllTodos === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
        />
        {todos.length > 0 && (
          <TodosList todos={filteredTodos} />
        )}
        <Footer
          todos={todos}
          filterType={filterType}
          handlerFilterType={setFilterType}
        />
      </div>
      {errorNotification && (
        <ErrorNotification
          errorNotification={errorNotification}
          setErrorNotification={setErrorNotification}
        />
      )}
    </div>
  );
};
