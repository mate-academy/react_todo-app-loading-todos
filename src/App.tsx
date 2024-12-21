/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isActive] = useState<number>();
  const [filter, setFilter] = useState<Filter>('all');
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const todosData = await getTodos();

      setTodos(todosData);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleToggleAll = () => {};

  const handleCloseError = () => {
    setErrorMessage('');
  };

  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          loading={loading}
          todosLeft={todosLeft}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          inputRef={inputRef}
          onToggleAll={handleToggleAll}
        />

        <TodoList
          filteredTodos={filteredTodos}
          loading={loading}
          isActive={isActive}
        />

        <Footer
          todos={todos}
          todosLeft={todosLeft}
          filter={filter}
          onFilterChange={handleFilterChange}
          loading={loading}
        />
      </div>

      <Error errorMessage={errorMessage} onClose={handleCloseError} />
    </div>
  );
};
