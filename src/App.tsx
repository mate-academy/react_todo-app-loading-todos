/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import ErrorNotification from './components/ErrorNotification';
import TodoFooter from './components/Todos/TodoFooter';
import TodoHeader from './components/Todos/TodoHeader';
import TodoList from './components/Todos/TodoList';
import { FilterTypes } from './types/FilterTypes';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterTypes>(FilterTypes.All);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const changeError = (value: boolean) => {
    setError(value);
  };

  const changeFilterType = (value: FilterTypes) => {
    setFilterType(value);
  };

  const visibleTodos = useMemo(() => {
    switch (filterType) {
      case FilterTypes.Active:
        return todos.filter(todo => !todo.completed);
      case FilterTypes.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }, [todos, filterType]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(setTodos)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFooter
              filterType={filterType}
              change={changeFilterType}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} changeError={changeError} />

    </div>
  );
};
