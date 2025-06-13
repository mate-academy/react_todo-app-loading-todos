/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { TodoList } from './components/todoList/todoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodosHeader } from './components/header/todosHeader';
import { TodosFooter } from './components/footer/todosFooter'; // eslint-disable-next-line
import { ErrorNotification } from './components/errorNotification/errorNotification';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<string>('all');

  useEffect(() => {
    setError(null); // Reset error state before fetching todos

    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
      })
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer); // Evita errores si el componente cambia antes de que pasen los 3s
    }

    return;
  }, [error]);

  const handleHideError = () => {
    setError(null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filterTodosByStatus = () => {
    switch (filter) {
      case 'active':
        return todosFromServer.filter(currentTodo => !currentTodo.completed);
      case 'completed':
        return todosFromServer.filter(currentTodo => currentTodo.completed);
      default:
        return todosFromServer;
    }
  };

  const visibleTodos = filterTodosByStatus();
  const completedItems = todosFromServer.filter(todo => todo.completed).length;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader todos={todosFromServer} />
        {todosFromServer.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <TodosFooter
              completedItems={completedItems}
              totalItems={todosFromServer.length}
              onFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
