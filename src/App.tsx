/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos, filterTodos } from './api/todos';
import { FilterBy } from './types/FilterBy';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { ErrorMessage } from './types/ErrorMessage';
import { NotificationError } from './components/NotificationError';
import { Loader } from './components/Loader';

const USER_ID = 6986;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeTodosCount = filterTodos(todos, FilterBy.ACTIVE).length;
  const completedTodosCount = filterTodos(todos, FilterBy.COMPLETED).length;
  const isAllCompleted = todos.length === completedTodosCount;

  const getTodosFromServer = async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch {
      setError(ErrorMessage.DOWNLOAD);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterBy);
  }, [todos, filterBy]);

  const errorReset = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const shouldDisplayTodos = !isLoading && !isError && todos;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      {isLoading && (
        <Loader />)}
      {shouldDisplayTodos && (
        <div className="todoapp__content">
          <NewTodoInput isButtonActive={isAllCompleted} />

          <TodoList todos={filteredTodos} />

          {!!todos.length && (
            <TodosFilter
              todosLeft={activeTodosCount}
              todosCompleted={completedTodosCount}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          )}
        </div>
      )}

      {error && (
        <NotificationError
          errorReset={errorReset}
          errorMessage={error}
        />
      )}
    </div>
  );
};
