/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';

function getFilteredTodos(
  currentTodos: Todo[],
  setCurrentFilter: 'all' | 'active' | 'completed',
) {
  const filteredTodos = [...currentTodos];

  switch (setCurrentFilter) {
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);
    case 'completed':
      return filteredTodos.filter(todo => todo.completed);
    case 'all':
      return filteredTodos;
    default:
      return;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setIsLoading(true);
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setIsLoading(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header disabled />
        <TodoList todos={visibleTodos ?? []} isLoading={isLoading} />
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setCurrentFilter={filter}
            onFilterChange={setFilter}
          />
        )}

        {/* Hide the footer if there are no todos */}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification errorMessage={error} onClose={() => setError('')} />
    </div>
  );
};
