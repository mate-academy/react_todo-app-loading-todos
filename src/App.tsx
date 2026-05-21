// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import { FilterType, ErrorMessage } from './types/Enum';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.None);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setErrorMessage(ErrorMessage.Load))
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  let filteredTodos = todos;

  if (filter === FilterType.Active) {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filter === FilterType.Completed) {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">{isLoading ? 'loading' : 'todos'}</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />

            <Footer todos={todos} filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
