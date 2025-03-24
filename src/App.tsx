/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    let newFilterTodos = [...todos];

    switch (filterStatus) {
      case FilterStatus.ACTIVE:
        newFilterTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterStatus.COMPLETED:
        newFilterTodos = todos.filter(todo => todo.completed);
        break;
    }

    setFilteredTodos(newFilterTodos);
  }, [filterStatus, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header filteredTodos={filteredTodos} />
        {todos?.length > 0 && (
          <>
            <TodoList filteredTodos={filteredTodos} />
            <Footer
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              filteredTodos={filteredTodos}
              todos={todos}
            />
          </>
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
