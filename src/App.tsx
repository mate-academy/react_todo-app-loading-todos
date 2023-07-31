/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { Filter, Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoMain } from './components/TodoMain/TodoMain';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoError } from './components/TodoError/TodoError';
import { filterTodosByStatus } from './utils/filterTodo';

export const App: React.FC = () => {
  const [baseTodo, setBaseTodo] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(Filter.ALL);
  const [error, setError] = useState('');

  const todos = useMemo(() => filterTodosByStatus(baseTodo, filterStatus), [baseTodo, filterStatus]
  )
  useEffect(() => {
    getTodos()
      .then(todo => {
        setBaseTodo(todo);
      })
      .catch(() => setError('Invalid url link'));
  }, []);

  const countTodoActive = useMemo(() => baseTodo
  .filter(todo => !todo.completed).length, [baseTodo])

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader countTodoActive={countTodoActive} />

        <TodoMain todos={todos} />

        <TodoFooter
          countTodoActive={countTodoActive}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>

      {error && <TodoError error={error} />}
    </div>
  );
};
