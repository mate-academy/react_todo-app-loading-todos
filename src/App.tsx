import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoError } from './components/TodoError';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  const handleError = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        handleError(ErrorType.LOAD_TODOS);

        return <UserWarning />;
      });
  }, []);

  function getVisibleTodos(newTodos: Todo[], newFilter: Filter) {
    switch (newFilter) {
      case Filter.Active:
        return newTodos.filter(todo => !todo.completed);

      case Filter.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>
      <TodoError error={errorMessage} setError={handleError} />
    </div>
  );
};
