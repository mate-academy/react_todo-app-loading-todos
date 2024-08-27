import React, { useEffect, useMemo, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';
import { ErrorBox } from './components/ErrorBox';
import { Filter } from './utils/Filter';
import { filterTodos } from './utils/todoFilter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const prepedTodos = useMemo(
    () => filterTodos(todos, filter),
    [filter, todos],
  );

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const isEveryActive =
    todos.every(todo => todo.completed === true) && todos.length !== 0;

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader isEveryActive={isEveryActive} setError={setErrorMessage} />
        <TodoMain todos={prepedTodos} />

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <TodoFooter
            setFilter={setFilter}
            activeTodosCount={activeTodosCount}
            filter={filter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorBox errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </div>
  );
};
