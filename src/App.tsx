/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { TodosError } from './components/TodosError/TodosError';
import { TodosFooter } from './components/TodosFooter/TodosFooter';
import { TodosHeader } from './components/TodosHeader/TodosHeader';
import { TodosList } from './components/TodosList/TodosList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 11331;

const ERROR_ADD = 'Unable to add a todo';
// const ERROR_DELETE = 'Unable to delete a todo';
// const ERROR_UPDATE = 'Unable to update a todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [error] = useState(ERROR_ADD);

  function getVisibleTodos(filterType: Filter): Todo[] {
    switch (filterType) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Comleted:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  const visibleTodos = useMemo(() => (
    getVisibleTodos(filter)
  ), [todos, filter]);

  const activeTodosCount = useMemo(() => (
    getVisibleTodos(Filter.Active).length
  ), [todos]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {});
  }, []);

  const isAnyTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader />

        {isAnyTodos && <TodosList todos={visibleTodos} />}

        { isAnyTodos
          && (
            <TodosFooter
              todosCount={activeTodosCount}
              onFilter={setFilter}
              filter={filter}
            />
          )}
      </div>

      { error && <TodosError errorMessage={error} />}
    </div>
  );
};
