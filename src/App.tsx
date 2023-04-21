/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { TodoInput } from './components/TodoInput';
import { TodosList } from './components/TodosList';
import { Todo } from './types/Todo';
import { TodosFilter } from './components/TodosFilter';
import { NotificationError } from './components/NotificationError';
import { Filter } from './types/Filter';
import { filterTodos } from './utils/helpers';
import { getTodos } from './api/todos';
import { ErrorAction } from './types/ErrorAction';

const USER_ID = 6796;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.ALL);
  const [error, setError] = useState<ErrorAction | null>(null);
  const activeTodosNum = filterTodos(todos, Filter.ACTIVE).length;
  const completeTodosNum = filterTodos(todos, Filter.COMPLETED).length;
  const areAllTodosCompleted = todos.length === completeTodosNum;

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
      setVisibleTodos([...todosFromServer]);
    } catch {
      setError(ErrorAction.DOWNLOAD);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useMemo(() => {
    const filteredTodos = filterTodos(todos, filterBy);

    setVisibleTodos([...filteredTodos]);
  }, [filterBy]);

  const resetError = () => {
    setTimeout(() => {
      setError(null);
    }, 500);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput
          isButtonActive={areAllTodosCompleted}
        />

        <TodosList todos={visibleTodos} />

        {todos.length > 0 && (
          <TodosFilter
            itemsLeft={activeTodosNum}
            completedLeft={completeTodosNum}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {error && (
        <NotificationError
          action={error}
          resetError={resetError}
        />
      )}
    </div>
  );
};
