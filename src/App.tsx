/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList, Footer, Header, Error, UserWarning } from './components';
import { getVisibleTodos } from './utils/getVisibleTodos';
import { FilterState } from './types/FilterState';
import { ErrorMessage } from './types/ErrorMassage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FilterState>(FilterState.All);

  const getActiveTodos = () => todos.filter(todo => !todo.completed).length;

  const hasCompleted = () => todos.some(todo => todo.completed);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load));
  }, []);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, filter), 
    [todos, filter]
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        {todos.length > 0 && <TodoList visibleTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer
            activeTodosCount={getActiveTodos()}
            filter={filter}
            setFilter={setFilter}
            hasCompleted={hasCompleted()}
          />
        )}
      </div>

      <Error errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
