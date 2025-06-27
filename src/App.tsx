/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorMessage } from './components/ErrorMessage';
import { Error } from './types/Error';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getTodos()
      .then(resolve => setTodos(resolve))
      .catch(() => setError(Error.UnableToLoadAll));
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterStatus);
  }, [todos, filterStatus]);

  const itemsLeftCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompletedTodo = todos.some(todo => todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={filteredTodos} />

        {!!todos.length && (
          <Footer
            activeCount={itemsLeftCount}
            currentFilter={filterStatus}
            setFilterStatus={setFilterStatus}
            hasCompletedTodo={hasCompletedTodo}
          />
        )}
      </div>

      <ErrorMessage error={error} close={() => setError(null)} />
    </div>
  );
};
