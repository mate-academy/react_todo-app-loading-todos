import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFilteredTodos } from './helpers/helpers';
import { getTodos } from './api/todos';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './components/TodoItem/Todo';
import { Error } from './components/ErrorNotification/Error';
import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';

import { UserWarning } from './UserWarning';

const USER_ID = 6748;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [error, setError] = useState<ErrorType>(ErrorType.NONE);

  const fetchTodos = async () => {
    try {
      const response = await getTodos(USER_ID);

      setError(ErrorType.NONE);
      setTodos(response);
    } catch {
      setError(ErrorType.LOAD);
      setTimeout(() => setError(ErrorType.NONE), 3000);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filterType),
    [filterType, todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        {todos && (
          <Footer
            todos={todos}
            filterType={filterType}
            onChangeFilterType={setFilterType}
          />
        )}
      </div>

      {error && (
        <Error
          error={error}
          onDeleteError={() => setError(ErrorType.NONE)}
        />
      )}
    </div>
  );
};
