import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer';
import { FilterBy } from './types/Filter';
import { TodoList } from './components/TodoList';
import { filterTodo } from './helpers/filterTodo';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { ErrorType } from './types/Errors';
import { Notifications } from './components/Errors';

const USER_ID = 12065;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, steErrorMessage] = useState<ErrorType | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const visibleError = (error: ErrorType) => {
    steErrorMessage(error);

    setTimeout(() => steErrorMessage(null), 3000);
  };

  useEffect(
    () => {
      getTodos(USER_ID)
        .then(setTodos)
        .catch(() => visibleError(ErrorType.UnableToLoadTodo));
    }, [],
  );

  const celectFilterTodo = useCallback(
    (
      todosFromServer: Todo[],
      optionByFilter: FilterBy,
    ) => filterTodo(todosFromServer, optionByFilter),
    [],
  );

  const preparedTodos = useMemo(
    () => celectFilterTodo(todos, filterBy),
    [celectFilterTodo, todos, filterBy],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={preparedTodos} />

        {todos.length > 0 && (
          <Footer filterBy={filterBy} todos={todos} setFilterBy={setFilterBy} />
        )}

      </div>

      <Notifications
        errorMessage={errorMessage}
        steErrorMessage={steErrorMessage}
      />
    </div>
  );
};
