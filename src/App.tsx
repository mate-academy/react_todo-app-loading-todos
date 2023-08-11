/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { getTodos } from './api/todos';
import { ErrorMessages } from './types/errorMessages';

const USER_ID = 11272;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState(FilterOptions.All);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages | ''>('');

  const activeTodosCount = todos
    .filter(todo => todo.completed === false)
    .length;

  const completedTodoCount = todos.some(todo => todo.completed === true);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(ErrorMessages.Add);
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }, [errorMessage]);

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
              hasCompletedTodo={completedTodoCount}
            />
          </>
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        hasError={hasError}
        onHasError={setHasError}
      />
    </div>
  );
};
