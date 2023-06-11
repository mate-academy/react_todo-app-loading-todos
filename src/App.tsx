/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { TodoAppContext } from './TodoAppContext';
import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { FilterType } from './types/FilterType';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const user = useContext<User | null>(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos(user?.id ?? 0);

      setTodos(response);
      setLoading(false);
    } catch {
      setLoadingError('Unable to load a todo');
      setTimeout(() => setLoadingError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterType) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todos, filterType]);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const contextValue = useMemo(() => {
    return {
      todos,
      loading,
      loadingError,
      filterType,
      setFilterType,
      visibleTodos,
      activeTodos,
    };
  }, [todos, loading, loadingError, filterType]);

  return (
    <TodoAppContext.Provider value={contextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <section
            className="todoapp__main"
            data-cy="TodoList"
          >
            {visibleTodos.map((todo) => (
              <TodoItem {...todo} />
            ))}
          </section>

          {todos.length > 0 && (<Footer />)}
        </div>

        <div
          data-cy="ErrorNotification"
          className={classNames(
            'notification is-danger is-light has-text-weight-normal',
            {
              hidden: !loadingError,
            },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setLoadingError('')}
          />

          {loadingError}
          <br />
        </div>
      </div>
    </TodoAppContext.Provider>
  );
};
