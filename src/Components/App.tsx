import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from '../UserWarning';
import { getTodos, USER_ID } from '../api/todos';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Todo } from '../types/Todo';
import { ErrorMessage } from './ErrorMessage';
import { ERROR } from '../types/Error';
const loadedTodos = getTodos();
const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;

export const FILTER = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

export type Filter = (typeof FILTER)[keyof typeof FILTER];
export type Status = (typeof STATUS)[keyof typeof STATUS];
export type Error = (typeof ERROR)[keyof typeof ERROR];

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(FILTER.all);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [error, setError] = useState<Error>(ERROR.noError);

  const filteredTodos = useMemo(() => {
    let filterTodos = todos;

    switch (filter) {
      case FILTER.all:
        break;
      case FILTER.active:
        filterTodos = todos.filter(todo => !todo.completed);
        break;
      case FILTER.completed:
        filterTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filterTodos;
  }, [filter, todos]);

  useEffect(() => {
    setError(ERROR.noError);
    setStatus(STATUS.pending);
    loadedTodos
      .then(data => {
        setTodos(data);
        setStatus(STATUS.resolved);
      })
      .catch(() => setError(ERROR.couldntLoadTodos));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {status === 'resolved' && <Main todos={filteredTodos} />}
        {status === 'resolved' && todos.length !== 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorMessage error={error} />
    </div>
  );
};
