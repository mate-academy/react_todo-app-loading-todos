/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { ErrorNotification } from './components/ErrorNotification';
import { filterTodos } from './utils/filterTodos';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorTodos, setErrorTodos] = useState<ErrorType>(ErrorType.Empty);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.All);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorTodos(ErrorType.LoadTodo);
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
        <TodoHeader todos={todos} />

        {todos.length !== 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filtered.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>
            <TodoFooter
              todos={todos}
              setTodos={setTodos}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          </>
        )}
      </div>
      <ErrorNotification error={errorTodos} setError={setErrorTodos} />
    </div>
  );
};
