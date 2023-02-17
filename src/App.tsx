/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { prepareTodos } from './utils/prepareTodos';
import { NewFormTodo } from './components/NewFormTodo';
import { TodoList } from './components/TodoList';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Notifications } from './components/Notifications';
import { ErrorType } from './types/ErrorType';
import { FilterBy } from './types/FilterBy';
import { Footer } from './components/Footer';

const USER_ID = 6332;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.LOAD);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [hasError, setHasError] = useState(false);

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) {
        setErrorType(ErrorType.LOAD);
        // switch (error.message) {  //will use it next step
        //   case ErrorType.LOAD:
        //     setErrorType(ErrorType.LOAD);
        //     break;

        //   case ErrorType.ADD:
        //     setErrorType(ErrorType.ADD);
        //     break;

        //   case ErrorType.UPDATE:
        //     setErrorType(ErrorType.UPDATE);
        //     break;

        //   case ErrorType.DELETE:
        //     setErrorType(ErrorType.DELETE);
        //     break;

        //   default:
        //     break;
        // }
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const visibleTodos = useMemo(() => { // changed number of todo in TodoList
    return prepareTodos(filterBy, todos);
  }, [filterBy, todos]); // depends on click on filterBy inside Footer

  const clearNotification = useCallback(() => {
    setHasError(false);
  }, []);

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  const isAllActiveTodos = useMemo(() => { // add class on button in header
    return todos.every(todo => todo.completed);
  }, [todos, notCompletedTodos]); // depends on has all todo completed true

  const isFooterVisible = !!todos.length;
  const isClearButtonVisible = todos.some(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all',
                {
                  active: isAllActiveTodos,
                })}
            />
          )}

          <NewFormTodo />

        </header>

        {visibleTodos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        {isFooterVisible && (
          <Footer
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            notCompletedTodos={notCompletedTodos}
            isClearButtonVisible={isClearButtonVisible}
          />
        )}
      </div>

      <Notifications
        errorType={errorType}
        hasError={hasError}
        clearNotification={clearNotification}
      />
    </div>
  );
};
