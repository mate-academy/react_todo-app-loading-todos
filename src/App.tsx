/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoAppHeader';
import { TodoAppMain } from './components/TodoAppMain';
import { TodoAppFooter } from './components/TodoAppFooter';
import { ErrorNotification } from './components/ErrorNotification';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterLink, preparedTodos } from './utils/TodoFilter';
import { ErrorMessage } from './utils/errorMessages';

const USER_ID = 11482;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState(FilterLink.All);
  const [errorMessages, setErrorMessages] = useState(ErrorMessage.Default);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessages(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    if (errorMessages) {
      setTimeout(() => {
        setErrorMessages(ErrorMessage.Default);
      }, 3000);
    }
  }, [errorMessages]);

  const visibleTodos = preparedTodos(todos, selectedFilter);
  const todosCounter = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAppHeader todos={visibleTodos} />

        {Boolean(todos.length) && (
          <>
            <TodoAppMain todos={visibleTodos} />
            <TodoAppFooter
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              todosCounter={todosCounter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        setErrorMessages={setErrorMessages}
        errorMessages={errorMessages}
      />
    </div>
  );
};
