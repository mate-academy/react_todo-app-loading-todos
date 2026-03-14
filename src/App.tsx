/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorMessage } from './components/ErrorMessage';
import EFilter from './utils/EFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<EFilter>(EFilter.all);
  const [fitlered, setFiltered] = useState<Todo[]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await getTodos();

      setTodos(data);
    } catch {
      setErrorMessage('Unable to load todos');
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const newTodo = [...todos];

    if (filter === EFilter.active) {
      setFiltered(newTodo.filter(todo => !todo.completed));
    }

    if (filter === EFilter.completed) {
      setFiltered(newTodo.filter(todo => todo.completed));
    }

    if (filter === EFilter.all) {
      setFiltered(newTodo);
    }
  }, [filter, todos]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      {isLoading ? (
        <></>
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <TodoHeader todos={todos} setTodos={setTodos} />

            <section className="todoapp__main" data-cy="TodoList">
              <TodoList todos={fitlered} />
            </section>

            {/* Hide the footer if there are no todos */}
            {todos.length !== 0 && (
              <TodoFooter todos={todos} filter={filter} setFilter={setFilter} />
            )}
          </div>

          <ErrorMessage
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
    </div>
  );
};
