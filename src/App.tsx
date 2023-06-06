/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './TodoList';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filters';
import { TodoFooter } from './TodoFooter';
import { Notification } from './Notification';

const USER_ID = 10603;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.All);
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(setTodos).catch(() => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos;

    switch (filterType) {
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = todos;
        break;
    }

    return filteredTodos;
  }, [filterType, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">

          {todos.find(todo => !todo.completed) && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList
            todos={visibleTodos}
          />
        )}

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}

      </div>

      <Notification
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        error={error}
      />

    </div>
  );
};
