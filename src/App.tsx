/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorType } from './types/ErrorType';
import { ErrorInfo } from './components/ErrorInfo/ErrorInfo';

const USER_ID = 12034;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);

  const displayError = (error: ErrorType) => {
    setErrorMessage(error);

    setTimeout(() => setErrorMessage(null), 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => displayError(ErrorType.UnableToLoad));
  }, []);

  const filterTodos = useCallback(
    (
      todos: Todo[],
    ) => {
      switch (filterBy) {
        case FilterBy.Active:
          return todos.filter(todo => !todo.completed);

        case FilterBy.Completed:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    }, [filterBy],
  );

  const todosToView = useMemo(
    () => filterTodos(todosFromServer),
    [filterTodos, todosFromServer],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">

        <Header todosFromServer={todosFromServer} />

        <TodoList todosToView={todosToView} />

        {todosFromServer.length > 0 && (
          <Footer
            todosFromServer={todosFromServer}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      <ErrorInfo
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
