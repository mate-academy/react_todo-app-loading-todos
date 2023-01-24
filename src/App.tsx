/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState(FilterType.ALL);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorMessage('Unable to load a todos'));
    }
  }, []);

  const activeTodos = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const visibleTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [filterType, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />
        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              activeTodos={activeTodos}
              filterType={filterType}
              selectFilterType={setFilterType}
            />
          </>
        )}
      </div>
      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          closeErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
