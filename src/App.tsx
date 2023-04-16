/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos, todosFilter } from './api/todos';
import { FilterBy } from './types/FilterBy';
import { NewTodoInput } from './components/NewTodoInput';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { ErrorMessage } from './types/ErrorMessage';
import { NotificationError } from './components/NotificationError';

const USER_ID = 6986;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const activeTodosCount = todosFilter(todos, FilterBy.ACTIVE).length;
  const completedTodosCount = todosFilter(todos, FilterBy.COMPLETED).length;
  const isThereAreActiveTodos = todos.length === completedTodosCount;

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
      setVisibleTodos([...todosFromServer]);
    } catch {
      setError(ErrorMessage.DOWNLOAD);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useMemo(() => {
    const filteredTodos = todosFilter(todos, filterBy);

    setVisibleTodos([...filteredTodos]);
  }, [filterBy]);

  const errorReset = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoInput isButtonActive={isThereAreActiveTodos} />

        <TodoList todos={visibleTodos} />

        {todos.length !== 0 && (
          <TodosFilter
            todosLeft={activeTodosCount}
            completedLeft={completedTodosCount}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {error && (
        <NotificationError
          errorReset={errorReset}
          errorMessage={error}
        />
      )}
    </div>
  );
};
