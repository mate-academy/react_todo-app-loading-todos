/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import './App.scss';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoNotification }
  from './components/TodoNotification/TodoNotification';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';
import { filterTodos } from './Helpers';

const USER_ID = 11031;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);
  const [filterOption, setFilterOption] = useState(FilterOptions.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setIsError(true));
  }, []);

  const visibleTodos = useMemo(() => filterTodos(todos, filterOption),
    [filterOption, todos]);
  const areTodosPresent = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader areTodosPresent={areTodosPresent} />

        <TodoList todos={visibleTodos} />

        {areTodosPresent
        && (
          <TodoFooter
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            visibleTodosLength={visibleTodos.length}
          />
        )}
      </div>

      {isError && <TodoNotification areTodosPresent={areTodosPresent} /> }
    </div>
  );
};
