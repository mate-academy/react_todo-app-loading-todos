/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Header } from './Header';
import { TodoItem } from './TodoItem';
import { Footer } from './Footer';
import { ErrorNotification } from './ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const todosFromServer = await client.get<Todo[]>(
        `/todos?userId=${USER_ID}`,
      );

      setTodos(todosFromServer);
    } catch {
      setError('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      userId: USER_ID,
      title,
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleAll = () => {
    const shouldCompleteAll = todos.some(t => !t.completed);

    setTodos(prev => prev.map(t => ({ ...t, completed: shouldCompleteAll })));
  };

  const toggleOne = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteOne = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const updateOne = (id: number, title: string) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, title } : t)));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const hideError = () => setError(null);

  const getFilterTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.length - activeTodosCount;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header todos={todos} onAddTodo={addTodo} onToggleAll={toggleAll} />
        {loading && <div className="loader" />}
        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {getFilterTodos().map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleOne}
                onDelete={deleteOne}
                onUpdate={updateOne}
              />
            ))}
          </section>
        )}
        {todos.length > 0 && (
          <Footer
            activeCount={activeTodosCount}
            completedCount={completedCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
      <ErrorNotification message={error} onClose={hideError} />
    </div>
  );
};
