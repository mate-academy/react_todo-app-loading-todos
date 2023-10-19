import React, { useEffect, useState } from 'react';

import * as todosAPI from './api/todos';
import { ErrorMessage } from './types/ErrorMessage';
import { TodoStatus } from './types/TodoStatus';

import { useTodosState } from './contexts/TodosContext';
import { UserWarning } from './components/UserWarning';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11645;

export const App: React.FC = () => {
  const [todos, todosDispatch] = useTodosState();
  const [filterBy, setIsFilterBy] = useState(TodoStatus.All);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  useEffect(() => {
    if (USER_ID) {
      setLoading(true);
      setErrorMessage('');

      todosAPI.getTodos(USER_ID)
        .then(res => todosDispatch({ type: 'initialize', payload: res }))
        .catch((error: Error) => setErrorMessage(error.message as ErrorMessage))
        .finally(() => setLoading(false));
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {
          todos.length > 0 && (
            <>
              <TodoList
                isLoading={loading}
                filterBy={filterBy}
              />
              <TodoFooter setIsFilterBy={setIsFilterBy} />
            </>
          )
        }
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
