import React, { useState, useRef, useEffect } from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { ErrorMessage } from './types/ErrorMessage';
import { Header } from './components/Header';
import { TodoList } from './components/Todolist';
import { Footer, Filter } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  // const completedTodosCount = todos.filter(todo => todo.completed).length;

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const hideError = () => setError('');

  useEffect(() => {
    hideError();
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.LOAD));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hideError();

    const trimmed = title.trim();

    if (!trimmed) {
      showError(ErrorMessage.EMPTY_TITLE);

      return;
    }

    createTodo({ title: trimmed })
      .then(todo => {
        setTodos(prev => [...prev, todo]);
        setTitle('');
        inputRef.current?.focus();
      })
      .catch(() => showError(ErrorMessage.ADD));
  };

  const handleDelete = (id: number) => {
    hideError();
    setLoadingIds(prev => [...prev, id]);

    deleteTodo(id)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      })
      .catch(() => showError(ErrorMessage.DELETE))
      .finally(() => {
        setLoadingIds(prev => prev.filter(tid => tid !== id));
      });
  };

  const toggleTodo = (todo: Todo) => {
    hideError();
    setLoadingIds(prev => [...prev, todo.id]);

    updateTodo(todo.id, { completed: !todo.completed })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      })
      .catch(() => showError(ErrorMessage.UPDATE))
      .finally(() => {
        setLoadingIds(prev => prev.filter(id => id !== todo.id));
      });
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  const hasTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          onTitleChange={setTitle}
          onSubmit={handleSubmit}
          inputRef={inputRef}
        />

        {hasTodos && (
          <TodoList
            todos={visibleTodos}
            loadingIds={loadingIds}
            onToggle={toggleTodo}
            onDelete={handleDelete}
          />
        )}

        {hasTodos && (
          <Footer
            filter={filter}
            activeTodosCount={activeTodosCount}
            onFilterChange={setFilter}
            onClearCompleted={() => {
              const completedIds = todos
                .filter(t => t.completed)
                .map(t => t.id);

              completedIds.forEach(id => handleDelete(id));
            }}
          />
        )}
      </div>

      <ErrorNotification error={error} onClose={hideError} />
    </div>
  );
};
