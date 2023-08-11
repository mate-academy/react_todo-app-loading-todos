/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Selected } from './types/Selected';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { FilterTodos } from './components/FilterTodos';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorMessages } from './types/ErrorMessages';

const USER_ID = 11281;

function getPreparedTodos(
  todos: Todo[], selected: Selected,
) {
  return todos.filter(todo => {
    switch (selected) {
      case Selected.ACTIVE: {
        return !todo.completed;
      }

      case Selected.COMPLETED: {
        return todo.completed;
      }

      default:
        return todos;
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.EMPTY);
  const [selected, setSelected]
  = useState<Selected>(Selected.ALL);

  useEffect(() => {
    setisLoading(true);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(error => setErrorMessage(error.message || ErrorMessages.GET))
      .finally(() => setisLoading(false));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(ErrorMessages.EMPTY);
      }, 3000);
    }
  }, [errorMessage]);

  const visibleTodos = useMemo(
    () => getPreparedTodos(todos, selected),
    [todos, selected],
  );
  const completedTodos = useMemo(
    () => visibleTodos.some(todo => todo.completed), [visibleTodos],
  );
  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed), [visibleTodos],
  );
  const amountActive = activeTodos.length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {!isLoading && (
        <div className="todoapp__content">
          <Header />
          {todos.length !== 0 && (
            <>
              <TodoList todos={visibleTodos} />
              <FilterTodos
                amountActive={amountActive}
                completTodos={completedTodos}
                selected={selected}
                setSelected={setSelected}
              />
            </>
          )}
        </div>
      )}

      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
