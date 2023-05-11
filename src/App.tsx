/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { BottomPanel } from './components/BottomPanel';
import { Filter } from './types/FilterEnum';
import { UserWarning } from './UserWarning';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 10268;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusOfTodo, setStatusOfTodo] = useState(Filter.ALL);
  const [hasError, setHasError] = useState(false);

  const changeStatusOfTodo = useCallback((status: Filter) => {
    setStatusOfTodo(status);
  }, []);

  const closeErrorMessage = useCallback(() => {
    setHasError(false);
  }, []);

  const filterTodos = (currentTodos: Todo[], filter: Filter) => {
    const copyTodos = [...currentTodos];

    switch (filter) {
      case Filter.ACTIVE:
        return copyTodos.filter(({ completed }) => !completed);
      case Filter.COMPLETED:
        return copyTodos.filter(({ completed }) => completed);
      default:
        return copyTodos;
    }
  };

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

  const visibleTodos = filterTodos(todos, statusOfTodo);

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
        {visibleTodos.length !== 0
          && (
            <>
              <TodoList todos={visibleTodos} />
              <BottomPanel
                countOfItems={visibleTodos.length}
                selectedFilter={statusOfTodo}
                changeStatusOfTodo={changeStatusOfTodo}
              />
            </>
          ) }

      </div>

      {hasError
        && (
          <ErrorMessage
            hasError={hasError}
            closeErrorMessage={closeErrorMessage}
          />
        )}
    </div>
  );
};
