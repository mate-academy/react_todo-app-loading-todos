import React from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  let visibleTodos = [...todos];

  if (filter === Filter.Active) {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filter === Filter.Completed) {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  function loadTodos() {
    setError('');
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .catch(() => {
        setError(ErrorMessage.Load);

        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }

  useEffect(loadTodos, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && <TodoList visibleTodos={visibleTodos} />}

        {todos.length > 0 && (
          <Footer todos={todos} filter={filter} onFilterChange={setFilter} />
        )}
      </div>
      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
