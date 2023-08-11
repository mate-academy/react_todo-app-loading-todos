/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { FilterOptions } from './types/FilterOptions';

const USER_ID = 11272;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(FilterOptions.All);
  const [hasError, setHasError] = useState(false);

  const activeTodosCount = todos
    .filter(todo => todo.completed === false)
    .length;

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos)
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }, [hasError]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        {!!todos.length && (
          <>
            <TodoList
              todos={todos}
              filterBy={filterOption}
            />
            <TodoFooter
              filterOption={filterOption}
              onChangeFilterOption={setFilterOption}
              activeTodosCount={activeTodosCount}
            />
          </>
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        hasError={hasError}
        onHasError={setHasError}
      />
    </div>
  );
};
