/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './copmonents/Header/Header';
import { TodoList } from './copmonents/TodoList/TodoList';
import { Footer } from './copmonents/Footer/Footer';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { ErrorNotification } from './copmonents/Error/Error';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }, []);

  const filteredTodos = useMemo((): Todo[] => {
    if (filterStatus === 'all') {
      return todos;
    }

    if (filterStatus === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    return todos.filter(todo => todo.completed);
  }, [filterStatus, todos]);

  const todosActiveQuantity = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              todosActiveQuantity={todosActiveQuantity}
            />
          </>
        )}
      </div>

      <ErrorNotification error={errorMessage} setError={setErrorMessage} />
    </div>
  );
};
