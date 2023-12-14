/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import './styles/index.scss';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { filterTodos, itemsLeft } from './helpers';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Progress } from './types/Progress';
import { ErrorType } from './types/ErrorEnum';
import { ErrorBlock } from './components/Error/ErrorBlock';

const USER_ID = 12022;

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [prgoressStatus, setProgressStatus] = useState<Progress>(Progress.All);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => setErrorMessage(ErrorType.Loading));
  }, []);

  const itemsLeftToShow = itemsLeft(todosFromServer);

  const isAllTodosCompeted = todosFromServer.every(todo => todo.completed);

  const todosToRender = useMemo(
    () => filterTodos(todosFromServer, prgoressStatus),
    [todosFromServer, prgoressStatus],
  );

  const closeError = useCallback(() => setErrorMessage(null), []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllTodosCompeted} />

        <TodoList todos={todosToRender} />

        { todosFromServer.length > 0 && (
          <Footer
            itemsLeft={itemsLeftToShow}
            setProgress={setProgressStatus}
          />
        )}

        {errorMessage && (
          <ErrorBlock
            onClose={closeError}
            errMessage={errorMessage}
          />
        )}
      </div>
    </div>
  );
};
