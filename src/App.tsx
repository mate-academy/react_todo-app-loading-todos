import React, { useContext, useEffect, useState } from 'react';

import { TodosHeader } from './Components/TodosHeader';
import { TodosFooter } from './Components/TodosFooter';
import { Todoslist } from './Components/TodosList';
import { TodoContext, TodosProvider } from './Components/TodosContext';
import { UserWarning } from './UserWarning';
import { ErrorNotification } from './Components/ErrorNotification';
import { ErrorMessage } from './Enum/ErrorMessage';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';

const USER_ID = 11360;
const URL = `/todos?userId=${USER_ID}`;

export const App: React.FC = () => {
  const { setTodo } = useContext(TodoContext);
  const [isError, setIsError] = useState<ErrorMessage>(ErrorMessage.NONE);

  useEffect(() => {
    client.get(URL).then(data => {
      const todosData = data as Todo[];

      setTodo(todosData);
    })
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
