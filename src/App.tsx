import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { CompletedStatus } from './types/CompletedStatus';
import { getPreparedTodos } from './utils/getPreparedTodos';
import { ErrorNotification } from './components/ErrorNotification';
import { countItemsLeft } from './utils/countItemsLeft';
import { TodoHeader } from './components/TodoHeader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleField, setTitleField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterByStatus, setFilterByStatus] = useState<CompletedStatus>(
    CompletedStatus.All,
  );

  const itemsLeft = countItemsLeft(todos);

  const handleError = (errMessage: string) => {
    setErrorMessage(errMessage);

    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const preparedTodos = getPreparedTodos(todos, { filterByStatus });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={preparedTodos}
          titleField={titleField}
          onTitleField={setTitleField}
        />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={preparedTodos} />
        </section>

        {todos.length > 0 && (
          <TodoFooter
            itemsLeft={itemsLeft}
            filterByStatus={filterByStatus}
            onFilterByStatus={setFilterByStatus}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
