/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/Todo';
import { Filters } from './types/Filtres';
import { ErrorNotification } from './components/ErrorNotification';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorTodos, setErrorTodos] = useState<string>('');
  const [isloadingTodos, setIsLoadingTodos] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.All);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorTodos('Unable to load todos');
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const filtered = useMemo(
    () => filterTodos(todos, currentFilter),
    [todos, currentFilter],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isloadingTodos={isloadingTodos}
            />
          ))}
        </section>

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            setTodos={setTodos}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
        )}
      </div>

      <ErrorNotification error={errorTodos} setError={setErrorTodos} />
    </div>
  );
};
