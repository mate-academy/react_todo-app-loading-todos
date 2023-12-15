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
import { filterTodos } from './helper';

const USER_ID = 12017;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(
    FilterType.All,
  );
  const [errorMsg, setErrorMsg] = useState<ErrorType | null>(null);

  const showError = (error: ErrorType) => {
    setErrorMsg(error);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => showError(ErrorType.TodosNotLoaded));
  }, []);

  const filteredTodos = useCallback(
    filterTodos,
    [selectedFilter],
  );

  const todosToView = useMemo(
    () => filteredTodos(todosFromServer, selectedFilter),
    [filteredTodos, todosFromServer, selectedFilter],
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
