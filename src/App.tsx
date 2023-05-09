/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { FilterType } from './types/Filter';

const USER_ID = 10209;

const todosFromServer = (todos: Todo[], filterType: string) => {
  switch (filterType) {
    case FilterType.ALL:
      return todos;

    case FilterType.ACTIVE:
      return todos.filter((todo) => !todo.completed);

    case FilterType.COMPLETED:
      return todos.filter((todo) => todo.completed);

    default:
      return [];
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors>(Errors.NONE);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setError(Errors.UPLOAD));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todosFromServer(todos, filterType);

  const handleError = (e: Errors) => {
    setError(e);
    setTimeout(() => {
      setError(Errors.NONE);
    }, 3000);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          hasSomeTodos={!!todos.length}
          onChangeIsError={handleError}
        />

        <TodoList
          todos={visibleTodos}
          onChangeIsError={handleError}
        />

        {!!todos.length && (
          <Footer
            todos={visibleTodos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}
      </div>

      {error
        && (
          <div
            className={
              classNames(
                'notification is-danger is-light has-text-weight-normal',
                { hidden: !error },
              )
            }
          >
            <button
              type="button"
              className="delete"
              onClick={() => setError(Errors.NONE)}
            />
            {error}
          </div>
        )}
    </div>
  );
};
