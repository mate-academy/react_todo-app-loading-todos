import {
  FC,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

import { Filter } from './types/FilterEnum';
import { UserWarning } from './UserWarning';
import { Error } from './components/Error';
import { BottomBar } from './components/BottomBar';
import { TodoList } from './components/TodoList';

const USER_ID = 10268;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOfTodo, setFilterOfTodo] = useState(Filter.All);
  const [hasError, setHasError] = useState(false);

  const handleSelectFilter = useCallback((status: Filter) => {
    setFilterOfTodo(status);
  }, []);

  const handleCloseError = useCallback(() => {
    setHasError(false);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterOfTodo) {
      case Filter.Active:
        return todos.filter(({ completed }) => !completed);
      case Filter.Completed:
        return todos.filter(({ completed }) => completed);
      default:
        return todos;
    }
  }, [todos, filterOfTodo]);

  useEffect(() => {
    const loadTodoFromServer = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setHasError(true);
      }
    };

    loadTodoFromServer();
  }, []);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;

    if (hasError) {
      timeoutID = setTimeout(() => {
        setHasError(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [hasError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!!filteredTodos.length && (
          <TodoList todos={filteredTodos} />
        )}

        {!!todos.length && (
          <BottomBar
            countOfItems={filteredTodos.length}
            selectedFilter={filterOfTodo}
            onSelect={handleSelectFilter}
          />
        ) }
      </div>

      {hasError && (
        <Error
          hasError={hasError}
          onClose={handleCloseError}
        />
      )}
    </div>
  );
};
