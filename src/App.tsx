/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { ErrorMessage } from './components/ErrorMessage';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import './styles/index.scss';

const USER_ID = 27;

export const filterTodos = (currentTodos: Todo[], query: Filter) => {
  return currentTodos.filter(todo => {
    switch (query) {
      case Filter.All:
        return todo;
      case Filter.Completed:
        return todo.completed;
      case Filter.Active:
        return !todo.completed;
      default:
        return todo;
    }
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => {
        setTodos(res);
      })
      .catch(() => setError(Error.UnableToLoadAll));
  }, []);

  const filteredTodos = useMemo(() => filterTodos(todos, filter),
    [todos, filter]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => todo.completed !== true).length;
  }, [todos]);

  const isCompletedTodos = !!todos
    .filter(todo => todo.completed === true).length;

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
            filterTodos={setFilter}
            currentFilter={filter}
            isCompletedTodos={isCompletedTodos}
            activeTodosCount={activeTodosCount}
          />
        )}
      </div>
      {error
        && <ErrorMessage error={error} close={() => setError(null)} /> }
    </div>
  );
};
