/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    setIsLoading(true);
    setErrorMsg('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMsg("Unable to load todos");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleErrorClose = () => {
    setErrorMsg('');
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

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

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

      <ErrorNotification errorMsg={errorMsg} onClose={handleErrorClose} />
    </div>
  );
};
