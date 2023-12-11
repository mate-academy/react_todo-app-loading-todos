import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { ErrorInfo } from './components/Errorinfo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorType } from './types/ErrorType';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

const USER_ID = 12017;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.All,
  );
  const [errorMsg, setErrorMsg] = useState<ErrorType | null>(null);

  const errorFound = (error: ErrorType) => {
    setErrorMsg(error);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => errorFound(ErrorType.TodosNotLoaded));
  }, []);

  const filterTodos = useCallback(
    (todos: Todo[]) => {
      switch (selectedFilter) {
        case FilterType.All:
          return todos;

        case FilterType.Active:
          return todos.filter(todo => !todo.completed);

        case FilterType.Completed:
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    },
    [selectedFilter],
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
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>

      <ErrorInfo errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
    </div>
  );
};
