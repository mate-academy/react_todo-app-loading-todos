/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './types/ErrorMessage';
import { FilterTypes } from './types/FIlterTypes';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { filterTodos } from './utils/filterTodos';

const USER_ID = 6359;

export const App: React.FC = () => {
  const [todos, setTodos] = useState < Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterTypes.ALL);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserTodo = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(ErrorMessage.SHOW);
        setHasError(true);
      }
    };

    fetchUserTodo();
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filterType);
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          <AddTodoForm />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </>
        )}
      </div>

      {hasError && <Notification errorMessage={errorMessage} />}
    </div>
  );
};
