import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = (todo: Todo) => {
    setTodos(prevTodos => (prevTodos ? [...prevTodos, todo] : [todo]));
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(true);
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return todo;
    } else if (filter === 'completed') {
      return todo.completed === true;
    } else if (filter === 'active') {
      return todo.completed === false;
    }
  });

  const handleToggle = (id: number) => {
    setTodos((prev: Todo[]) => {
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
    });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos && (
            <button
              type="button"
              className="todoapp__toggle-all active"
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo newTodo={handleAddTodo} />
        </header>

        <TodoList todos={filteredTodos} toggleStatus={handleToggle} />

        {todos.length > 1 && <Footer data={todos} setFilter={setFilter} />}
      </div>

      <ErrorNotification
        status={error}
        statusMessage={errorMessage}
        setStatus={setError}
        setStatusMessage={setErrorMessage}
      />
    </div>
  );
};
