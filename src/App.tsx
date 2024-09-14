import React, { useState, useEffect } from 'react';

import { USER_ID, getTodos } from './api/todos';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Filter, Status } from './utils/TodoFilter';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<Status>(Status.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const preparedTodos = Filter(todos, selectedFilter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={preparedTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
