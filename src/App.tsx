import React, { useState, useEffect } from 'react';
import { getTodos } from './api/todos';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError(null);

      try {
        const todosFromApi = await getTodos();

        setTodos(todosFromApi);
      } catch {
        setError('Unable to load todos');
      } finally {
        setLoading(false);
      }
    };

    if (USER_ID) {
      loadTodos();
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddTodo = (title: string) => {
    if (title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: title.trim(),
          completed: false,
          userId: 0,
        },
      ]);
    }
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const handleFilterChange = (newFilter: FilterType) => setFilter(newFilter);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterType.Active) {
      return !todo.completed;
    }

    if (filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title" data-cy="TodoAppTitle">
        todos
      </h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            aria-label="Mark all as completed"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            onClick={handleToggleAll}
            data-cy="ToggleAllButton"
          />
          <TodoForm onAddTodo={handleAddTodo} />
        </header>

        <TodoList todos={filteredTodos} loading={loading} setTodos={setTodos} />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={handleFilterChange}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {error && (
        <ErrorNotification error={error} onClose={() => setError(null)} />
      )}
    </div>
  );
};
