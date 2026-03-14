/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { Filter } from './types/Filter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    setIsLoading(true);
    setErrMsg('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrMsg('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleErrorClose = () => {
    setErrMsg('');
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length > 0,
    [todos],
  );

  const areAllCompleted = useMemo(
    () => todos.length > 0 && todos.every(todo => todo.completed),
    [todos],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} areAllCompleted={areAllCompleted} />

        <TodoList todos={filteredTodos} isLoading={isLoading} />

        {todos.length !== 0 && (
          <TodoFooter
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            filter={filter}
            onFilterChange={setFilter}
          />
        )}
      </div>

      <ErrorNotification errMsg={errMsg} onClose={handleErrorClose} />
    </div>
  );
};
