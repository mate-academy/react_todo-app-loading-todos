/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/Todos/TodoFooter';
import { TodoHeader } from './components/Todos/TodoHeader';
import { TodoList } from './components/Todos/TodoList';
import { FilterValues } from './types/FilterValues';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterValue, setFilterValue]
  = useState<FilterValues>(FilterValues.ALL);

  const visibleTodos = useMemo(() => {
    switch (filterValue) {
      case FilterValues.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterValues.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }, [todos, filterValue]);

  const activeTodosTotal = useMemo(() => {
    return todos.filter(({ completed }) => !completed).length;
  }, [todos]);

  const isLeftActiveTodos = activeTodosTotal === todos.length;

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          isLeftActiveTodos={isLeftActiveTodos}
        />
        {!todos.length && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFooter
              activeTodosTotal={activeTodosTotal}
              filterType={filterValue}
              change={setFilterValue}
            />
          </>
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
