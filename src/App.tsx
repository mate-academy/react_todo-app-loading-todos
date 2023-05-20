import React, { useState, useEffect, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoNotification } from './components/TodoNotification';
import { getTodos, getVisibleTodos } from './api/todos';
import { TodoStatus } from './types/TodoStatus';
import { Todo } from './types/Todo';

const USER_ID = 10509;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(TodoStatus.All);
  const [hasError, setHasError] = useState(false);

  let timeoutId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    getTodos(USER_ID)
      .then(todoList => setTodos(todoList))
      .catch(() => {
        setHasError(true);

        timeoutId = setTimeout(() => {
          setHasError(false);
        }, 3000);
      });

    return () => clearTimeout(timeoutId);
  }, [USER_ID]);

  const handleFilterBy = useCallback((str: TodoStatus) => {
    setFilterBy(str);
  }, []);

  const handleCloseButton = useCallback(() => {
    setHasError(!hasError);
  }, []);

  const visibleTodos = getVisibleTodos(todos, filterBy);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodoFooter
              handleFilterBy={handleFilterBy}
              filterBy={filterBy}
              itemsLeft={activeTodosCount}
              completedTodos={todos.length - activeTodosCount}
            />
          </>
        )}
      </div>

      <TodoNotification
        handleCloseButton={handleCloseButton}
        hasError={hasError}
      />
    </div>
  );
};
