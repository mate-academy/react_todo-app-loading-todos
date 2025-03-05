import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  apiAddTodo,
  deleteTodo,
  getTodos,
  patchTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { FilterType } from './types/FilterType';
import { ErrorNotification } from './Components/ErrorNotification';

interface ExtendedTodo extends Todo {
  pendingToggle?: boolean;
  pendingDelete?: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<ExtendedTodo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterType.Active) {
      return !todo.completed;
    }

    if (filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  const handleFilterChange = (newFilter: FilterType): void =>
    setFilter(newFilter);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title should not be empty');

      return;
    }

    const trimmedTitle = title.trim();
    const tempTodo: ExtendedTodo = {
      id: -Date.now(),
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, tempTodo]);
    setLoading(true);

    apiAddTodo({ title: trimmedTitle, completed: false, userId: USER_ID })
      .then(newTodo =>
        setTodos(prev =>
          prev.map(todo => (todo.id === tempTodo.id ? newTodo : todo)),
        ),
      )
      .catch(() => {
        setTodos(prev => prev.filter(todo => todo.id !== tempTodo.id));
        setError('Unable to add a todo');
      })
      .finally(() => setLoading(false));
  };

  const onDelete = (id: number): void => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, pendingDelete: true } : todo,
      ),
    );
    deleteTodo(id)
      .then(() => setTodos(prev => prev.filter(todo => todo.id !== id)))
      .catch(() => {
        setError('Unable to delete a todo');
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, pendingDelete: false } : todo,
          ),
        );
      });
  };

  const toggleTodo = (id: number): void => {
    const currentTodo = todos.find(todo => todo.id === id);

    if (!currentTodo) {
      return;
    }

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, pendingToggle: true } : todo,
      ),
    );
    patchTodo(id, { completed: !currentTodo.completed })
      .then(updatedTodo =>
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? updatedTodo : todo)),
        ),
      )
      .catch(() => {
        setError('Failed to update todo');
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, pendingToggle: false } : todo,
          ),
        );
      });
  };

  const onToggleAll = (): void => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <ErrorNotification
        error={error}
        isVisible={!!error}
        onClose={() => setError(null)}
      />
      <div className="todoapp__content">
        <Header
          todos={todos}
          title={title}
          setTitle={setTitle}
          setError={setError}
          handleSubmit={handleSubmit}
          loading={loading}
          onToggleAll={onToggleAll} // Pass the onToggleAll function
        />
        {todos.length > 0 && (
          <TodoList
            filteredTodos={filteredTodos}
            loading={loading}
            onDelete={onDelete}
            onToggle={toggleTodo}
          />
        )}
        {todos.length > 0 && (
          <Footer
            activeCount={activeCount}
            filter={filter}
            hasCompleted={hasCompleted}
            handleFilterChange={handleFilterChange}
            onClearCompleted={() =>
              setTodos(prev => prev.filter(todo => !todo.completed))
            }
          />
        )}
      </div>
    </div>
  );
};
