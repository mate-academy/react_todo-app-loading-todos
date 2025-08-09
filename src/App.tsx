/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  type FilterType = 'all' | 'active' | 'completed';
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const loadTodos = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    } catch {
      setErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'active') {
      return !todo.completed;
    }

    if (activeFilter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const incompleteCount = todos.filter(todo => !todo.completed).length;

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} loading={loading} />

        {loading && todos.length !== 0 ? (
          <Loader />
        ) : (
          <>
            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
          </>
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            incompleteCount={incompleteCount}
          />
        )}

        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      </div>
    </div>
  );
};
