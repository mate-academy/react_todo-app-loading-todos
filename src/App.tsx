import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo, FilterType } from './types/Todo';
import { AddInput } from './components/AddInput/AddInput';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList';
import { AddError } from './components/AddError/AddError';
import { getTodos } from './api/todos';

const USER_ID = 7025;

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);

  const fetchData = async () => {
    const todosFromServer = await getTodos(USER_ID);

    try {
      setTodo(todosFromServer);
    } catch {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterTodo = useMemo(() => {
    return todos.filter((todo) => {
      switch (filterType) {
        case FilterType.ALL:
          return todo;

        case FilterType.ACTIVE:
          return !todo.completed;

        case FilterType.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, filterType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <AddInput />
        </header>

        <TodoList todos={filterTodo} />

        <TodoFilter
          todos={todos}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>

      {error && (
        <AddError />
      )}
    </div>
  );
};
