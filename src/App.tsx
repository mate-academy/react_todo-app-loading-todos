/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Errors } from './types/Errors';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Filter } from './types/Filter';
import { filterTodo } from './utils/filterFunc';

const USER_ID = 12047;

export const App: React.FC = () => {
  const [error, setError] = useState<Errors | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const filteredTodo = filterTodo(todos, filterType);

  useEffect(() => {
    const getData = async () => {
      try {
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setError('Unable to load todos');
      }
    };

    getData();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList
          filteredTodo={filteredTodo}
        />

        {filteredTodo.length > 0 && (
          <TodoFooter
            setFilterType={setFilterType}
            filterType={filterType}
            filteredTodo={filteredTodo}
          />
        )}
        {error && (
          <ErrorNotification setError={setError} error={error} />
        )}
      </div>
    </div>
  );
};
