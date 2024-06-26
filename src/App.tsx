import React, { useEffect, useState, useCallback, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';
import { TodoList } from './components/TodoList';
import { Error } from './types/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const timeoutRef = useRef<number | null>(null);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);

    // Clear any existing timeout before setting a new one
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setErrorMessage('');
      timeoutRef.current = null;
    }, 3000);
  }, []);

  const loadPosts = useCallback(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(Error.LOAD_TODOS));
  }, [handleError]);

  useEffect(() => {
    loadPosts();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loadPosts]);

  const getVisibleTodos = useCallback((newTodos: Todo[], newFilter: Filter) => {
    switch (newFilter) {
      case Filter.Active:
        return newTodos.filter(todo => !todo.completed);

      case Filter.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }, []);

  const visibleTodos = getVisibleTodos(todos, filter);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title is-unselectable">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList visibleTodos={visibleTodos} />

        {!!todos.length && (
          <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <TodoErrorMessage error={errorMessage} />
    </div>
  );
};
