/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from
  './components/ErrorNotification/ErrorNotification';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './types/Errors';
import { FilterType } from './types/FilterType';
import { filterTodos } from './helpers/helper';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Error>(Error.None);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorMessage(Error.LoadError));
    }
  }, [user]);

  const visibleTodos = useMemo(() => filterTodos(todos, filterType),
    [filterType, todos]);

  const uncompletedTodosAmount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              uncompletedTodosAmount={uncompletedTodosAmount}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          setMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
