/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Errors } from './Components/Errors/Errors';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { ErrorType } from './types/ErrorType';
import { FilterField } from './types/FilterField';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { prepareTodos } from './utils/prepareTodos';

const USER_ID = 6327;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(ErrorType.NONE);
  const [isError, setIsError] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterField>(FilterField.ALL);

  const count = todos.length;
  const preparedTodos = prepareTodos(filterBy, todos);

  const isActive = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => setTodos(data))
      .catch(() => {
        setHasError(ErrorType.UPLOAD_ERROR);
        setIsError(true);
      });
  }, [USER_ID]);

  const errorClose = () => {
    setIsError(false);
  };

  const setFilterByField = (field: FilterField) => {
    setFilterBy(field);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header count={count} isActiveCount={isActive.length} />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={preparedTodos}
            />

            <Footer
              filterBy={filterBy}
              isActiveCount={isActive.length}
              onSetFilterByField={setFilterByField}
            />
          </>
        )}

      </div>

      {isError
      && (
        <Errors
          errorMassage={hasError}
          onErrorClose={errorClose}
          isError={isError}
        />
      )}
    </div>
  );
};
