/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID, createTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Error } from './types/Error';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setError(null);
    getTodos()
      .then(result => {
        setTodos(result);
      })
      .catch(() => setError(Error.Load_todos))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const addTodo = ({ title: todoTitle, userId, completed }: Todo) => {
    createTodo({ title: todoTitle, userId, completed })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        inputRef.current?.focus();
      })
      .catch(() => setError(Error.Add_todo));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!title.trim()) {
        setError(Error.Empty_title);

        return;
      }

      addTodo({ title, userId: USER_ID, completed: false });
      setTitle('');
    }
  };

  const handleCompletedChange = (id: number) => {
    setTodos(current =>
      current.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          inputRef={inputRef}
          title={title}
          handleKeyDown={handleKeyDown}
          handleTitleChange={handleTitleChange}
        />

        {!isLoading && todos.length > 0 && (
          <TodoList
            todos={todos}
            filter={filter}
            handleCompletedChange={handleCompletedChange}
            isLoading={isLoading}
          />
        )}

        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
