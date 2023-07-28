import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { ErrorType } from './types/ErrorType';
import { SortType } from './types/SortType';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const USER_ID = 11229;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState(SortType.ALL);
  const [error, setError] = useState(ErrorType.NONE);

  useEffect(() => {
    setError(ErrorType.NONE);
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(ErrorType.LOAD));
  }, []);

  const getPreparedTodos = useCallback((
    currentTodos: Todo[],
  ) => {
    let sortedTodos = [];

    switch (sort) {
      case SortType.ALL:
        sortedTodos = [...todos];
        break;

      case SortType.ACTIVE:
        sortedTodos = currentTodos.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        sortedTodos = currentTodos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Wrong sort type');
    }

    return sortedTodos;
  }, [todos, sort]);

  const preparedTodos = useMemo(() => (
    getPreparedTodos(todos)
  ), [todos, sort]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header preparedTodos={preparedTodos} />

        <section className="todoapp__main">
          {preparedTodos.map(todo => (
            <div
              className={cn('todo', {
                completed: todo.completed,
              })}
              key={todo.id}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  defaultChecked={todo.completed}
                />
              </label>

              <span className="todo__title">{todo.title}</span>
              <button type="button" className="todo__remove">×</button>

              {/* className="modal overlay is-active" */}

              <div className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {!!todos.length && (
          <Footer
            todos={todos}
            preparedTodos={preparedTodos}
            sort={sort}
            setSort={setSort}
          />
        )}
      </div>

      {!!error && (
        <ErrorMessage error={error} setError={setError} />
      )}
    </div>
  );
};
