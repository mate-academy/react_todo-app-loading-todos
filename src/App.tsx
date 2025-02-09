/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { ErrorTypes } from './types/ErrorTypes';
import { filterTodos } from './utils/filterTodos';
import { TodoFooter } from './components/TodoFooter';
import { TodoError } from './components/TodoError';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorTodo, setErrorTodo] = useState<ErrorTypes>(ErrorTypes.Empty);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.All);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorTodo(ErrorTypes.LoadTodo));
  }, []);

  const filteredTodos = useMemo(
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
        <TodoHeader />

        {todos.length !== 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <TodoList todos={filteredTodos} />
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

      <TodoError error={errorTodo} setError={setErrorTodo} />
    </div>
  );
};
