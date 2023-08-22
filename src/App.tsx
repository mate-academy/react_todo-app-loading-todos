import React, { useEffect, useState } from 'react';

import { TodosHeader } from './Components/TodosHeader';
import { TodosFooter } from './Components/TodosFooter';
import { Todoslist } from './Components/TodosList';
import { TodosProvider } from './Components/TodosContext';
import { UserWarning } from './UserWarning';
import { ErrorNotification } from './Components/ErrorNotification';
import { ErrorMessage } from './Enum/ErrorMessage';
import { getTodos } from './api/todos';
import { useTodo } from './Hooks/UseTodo';

const USER_ID = 11360;

export const App: React.FC = () => {
  const { setTodo } = useTodo();
  const [isError, setIsError] = useState<ErrorMessage>(ErrorMessage.NONE);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodo)
      .catch((error: { message: React.SetStateAction<ErrorMessage> }) => {
        setIsError(error.message);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodosProvider>
        <div className="todoapp__content">
          <TodosHeader />
          <Todoslist />
          <TodosFooter />
        </div>
      </TodosProvider>

      <ErrorNotification
        error={isError}
        setError={setIsError}
      />
    </div>
  );
};
