import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Footer } from './components/Footer/Footer';
import { FilterBy } from './types/Filter';
import { TodoList } from './components/TodoList/TodoList';
import { filterTodo } from './components/TodoFilter';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { ErrorType } from './types/Errors';
import { Error } from './components/Error/Error';

const USER_ID = 12106;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const visibleError = (error: ErrorType) => {
    setErrorMessage(error);

    setTimeout(() => setErrorMessage(null), 3000);
  };

  useEffect(
    () => {
      getTodos(USER_ID)
        .then(setTodos)
        .catch(() => visibleError(ErrorType.UnableToLoadTodo));
    }, [],
  );

  function selectFilterTodo(
    todosFromServer: Todo[],
    optionByFilter: FilterBy,
  ): Todo[] {
    return filterTodo(todosFromServer, optionByFilter);
  }

  const preparedTodos = selectFilterTodo(todos, filterBy);

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

      <Error
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
