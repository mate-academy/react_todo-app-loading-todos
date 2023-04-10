import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { AddTodo } from './components/AddTodo';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorType } from './types/Error';
import { getFilteredTodos } from './utils/helpers';
import { TaskStatus } from './types/Sort';
import { USER_ID } from './utils/constants';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(ErrorType.NONE);
  const [sortType, setSortType] = useState(TaskStatus.ALL);

  const fetchTodos = async () => {
    try {
      const getData = await getTodos(USER_ID);

      setTodos(getData);
      setError(ErrorType.NONE);
    } catch {
      setError(ErrorType.LOAD);
      setTimeout(() => setError(ErrorType.NONE), 3000);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, sortType),
    [todos, sortType],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleRemoveError = () => {
    setError(ErrorType.NONE);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddTodo />

        <TodoList todos={filteredTodos} />

        {todos && (
          <Filter
            todos={todos}
            sortType={sortType}
            onChangeSortType={setSortType}
          />
        )}
      </div>

      {error
        && (
          <Notification
            error={error}
            onRemoveError={handleRemoveError}
          />
        )}
    </div>
  );
};
