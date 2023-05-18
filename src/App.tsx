/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { Notification } from './components/notification';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { USER_ID } from './utils/constants';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [filter, setFilter] = useState<string>(Filter.ALL);
  const itemsLeft: number = todos?.filter(todo => !todo.completed).length || 0;
  const completedTodos = todos?.filter(todo => todo.completed).length || 0;

  const handleSetError = (errVal: string | null) => {
    setError(errVal);
  };

  const loadTodos = async () => {
    try {
      await getTodos(USER_ID)
        .then(res => setTodos(res));
    } catch {
      setError('load');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSelectFilter = (filterValue: string) => {
    setFilter(filterValue);
  };

  const visibleTodos = useMemo(() => {
    let filteredTodos: Todo[] | null = todos;

    if (filter === Filter.ACTIVE) {
      filteredTodos = todos ? todos.filter(todo => !todo.completed) : null;
    }

    if (filter === Filter.COMPLETED) {
      filteredTodos = todos ? todos.filter(todo => todo.completed) : null;
    }

    return filteredTodos || [];
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onError={handleSetError} />

        {todos && (
          <>
            <Main todos={visibleTodos} />
            <Footer
              onSelect={handleSelectFilter}
              selectedFilter={filter}
              itemsLeft={itemsLeft}
              completedTodos={completedTodos}
            />
          </>
        )}
      </div>
      {error && (<Notification onError={handleSetError} error={error} />)}
    </div>
  );
};
