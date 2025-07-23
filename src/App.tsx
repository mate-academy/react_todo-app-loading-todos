import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, USER_ID } from './api/todos';
import { Header } from './components/header';
import { MainSection } from './components/mainSection';
import { Todo } from './types/Todo';
import { Footer } from './components/footer';

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [date, setDate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);

  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);

  const [isError, setIsError] = useState<string | null>(null);

  const hideErrorMessage = () => {
    setTimeout(() => {
      setIsError(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setIsError('Unable to load todos');
        hideErrorMessage();
      });
  }, [date]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addNewTodoFromInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Omit<Todo, 'id'> = {
      title,
      completed: false,
      userId: USER_ID,
    };

    addTodo(newTodo)
      .then(todo => {
        setTodos(prevTodos => [...prevTodos, todo]);
        setTitle('');
        setDate(new Date());
      })
      .catch(() => {
        setIsError('Unable to add todo');
        hideErrorMessage();
      });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'all') {
      return todo;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          addNewTodoFromInput={addNewTodoFromInput}
          todos={todos}
          setTodos={setTodos}
          setIsLoading={setIsLoading}
          setLoadingTodoIds={setLoadingTodoIds}
        />

        <MainSection
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          loadingTodoId={loadingTodoId}
          setLoadingTodoId={setLoadingTodoId}
          setLoadingTodoIds={setLoadingTodoIds}
          loadingTodoIds={loadingTodoIds}
          setIsError={setIsError}
          hideErrorMessage={hideErrorMessage}
        />

        {todos.length !== 0 && (
          <Footer
            setFilter={setFilter}
            todos={todos}
            filter={filter}
            setTodos={setTodos}
            setIsError={setIsError}
            hideErrorMessage={hideErrorMessage}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${isError === null ? 'hidden' : ''}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setIsError(null);
            setDate(new Date());
          }}
        />
        {isError}
      </div>
    </div>
  );
};
