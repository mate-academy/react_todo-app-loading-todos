// #region IMPORTS
import {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import cn from 'classnames';
import { getTodos } from './api/sendRequest';
import { Status } from './enum/Status';
import { ErrorType } from './enum/ErrorType';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList/TodoList';
import { TodoStatus } from './Components/TodoFilter/TodoFilter';
// #endregion

const USER_ID = 10346;

export const App: FC = () => {
  // #region STATES & VARIABLES
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [errorType, setErrorType] = useState(ErrorType.None);
  const [isErrorNotification, setIsErrorNotification] = useState(false);
  const isError = errorType !== ErrorType.None;
  // #endregion

  // #region ✅ ERRORS
  const setError = (typeOfError: ErrorType) => {
    setErrorType(typeOfError);
    setTimeout(() => setErrorType(ErrorType.None), 3000);
  };

  const errorMessage = useCallback(() => {
    switch (errorType) {
      case ErrorType.Fetch:
        return 'Unable to fetch a todo';

      case ErrorType.Add:
        return 'Unable to add a todo';

      case ErrorType.EmptyString:
        return 'Unable to add an empty todo';

      case ErrorType.Delete:
        return 'Unable to delete a todo';

      case ErrorType.Update:
        return 'Unable to update a todo';

      default:
        return 'Unexpected error';
    }
  }, [errorType]);
  // #endregion

  // #region ✅ FILTERS
  const visibleTodos = useMemo(() => (
    todos.filter(({ completed }) => {
      switch (status) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        default:
          return true;
      }
    })
  ), [todos, status]);

  const filteredTodos = todos.filter((todo) => !todo.completed).length;
  // #endregion

  // #region ✅ Fetching & Updating Todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTodos(await getTodos(USER_ID));
      } catch (error) {
        setError(ErrorType.Fetch);
        throw error;
      }
    };

    fetchData();
  }, []);

  const handleStatusChanged = (stats: Status) => {
    setStatus(stats);
  };
  // #endregion

  // #region RENDER
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: false,
            })}
          />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${filteredTodos} items left`}
          </span>

          <TodoStatus
            status={status}
            onStatusChanged={handleStatusChanged}
          />

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        </footer>

        {isError && !isErrorNotification && (
          <div className={cn(
            'notification', 'is-danger', 'is-light', 'has-text-weight-normal', {
              hidden: isErrorNotification,
            },
          )}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={() => setIsErrorNotification(true)}
            />
            {errorMessage()}
          </div>
        )}
      </div>
    </div>
  );
};
// #endregion
