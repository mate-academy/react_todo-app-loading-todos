import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { ErrorType } from './types/ErrorType';
import { SortType } from './types/SortType';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { TodoList } from './components/TodoList';

const USER_ID = 11229;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState(SortType.ALL);
  const [error, setError] = useState(ErrorType.NONE);

  useEffect(() => {
    setError(ErrorType.NONE);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setError(ErrorType.LOAD);
        setTimeout(() => setError(ErrorType.NONE), 3000);
      });
  }, []);

  const preparedTodos = useMemo(() => {
    let sortedTodos = [];

    switch (sort) {
      case SortType.ALL:
        sortedTodos = [...todos];
        break;

      case SortType.ACTIVE:
        sortedTodos = todos.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        sortedTodos = todos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Wrong sort type');
    }

    return sortedTodos;
  }, [todos, sort]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header preparedTodos={preparedTodos} />

        <TodoList preparedTodos={preparedTodos} />

        {!!todos.length && (
          <Footer
            todos={todos}
            preparedTodos={preparedTodos}
            sort={sort}
            setSort={setSort}
          />
        )}
      </div>

      <ErrorMessage error={error} setError={setError} />
    </div>
  );
};
