import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorMessages, FilterStates } from './types/enums';
import { filterTodos } from './utils/todoFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStates>(FilterStates.ALL);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!USER_ID) {
        return;
      }

      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err) {
        setError(ErrorMessages.LOAD_TODOS);
        const timer = setTimeout(() => setError(null), 3000);

        return () => clearTimeout(timer);
      }
    };

    fetchTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = filterTodos(todos, filter);
  const hasTodos = todos.length > 0;
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header allCompleted={allCompleted} />
        <TodoList todos={filteredTodos} />
        {hasTodos && (
          <Footer todos={todos} filter={filter} setFilter={setFilter} />
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
