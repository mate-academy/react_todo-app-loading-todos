/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { TodoError } from './types/TodoError';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { getPraperedTodos } from './services/todos';
import { TodoList } from './components/TodoList';

const USER_ID = 11968;

export const App: React.FC = () => {
  // #region STATE
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<TodoError>(TodoError.NONE);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  // #endregion

  // #region EFFECT
  useEffect(() => {
    setIsLoading(true);

    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMsg(TodoError.LOAD))
      .finally(() => setIsLoading(false));
  }, []);
  // #endregion

  const visibleTodos: Todo[] = getPraperedTodos(todos, filter);
  const activeTodos: Todo[] = getPraperedTodos(todos, Filter.ACTIVE);
  const handleFilterChange = (v: Filter) => {
    setFilter(v);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {!!todos.length && (
          <>
            <TodoList todos={visibleTodos} />

            <TodoFooter
              filter={filter}
              onFilterChange={handleFilterChange}
              quantityActiveTodos={activeTodos.length}
              isAnyTodoComplete={todos.some(todo => todo.completed)}
            />
          </>
        )}
      </div>

      {!isLoading && (
        <ErrorNotification
          errorMsg={errorMsg}
          onErrorDelete={() => setErrorMsg(TodoError.NONE)}
        />
      )}
    </div>
  );
};
