/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  USER_ID,
} from './api/todos';

import { Todo } from './types/Todo';
import { Filter } from './enums/Filter';
import { ErrorMessage } from './enums/ErrorMessage';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotif/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [error, setError] = useState('');
  const [processingIds, setProcessingIds] = useState<number[]>([]);

  const showError = (message: ErrorMessage) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        showError(ErrorMessage.Load);
      }
    };

    load();
  }, []);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      showError(ErrorMessage.EmptyTitle);

      return;
    }

    try {
      const created = await addTodo({
        userId: USER_ID,
        title: title.trim(),
        completed: false,
      });

      setTodos(prev => [...prev, created]);
      setTitle('');
    } catch {
      showError(ErrorMessage.Add);
    }
  };

  const handleDelete = async (id: number) => {
    setProcessingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      showError(ErrorMessage.Delete);
    } finally {
      setProcessingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleToggle = async (todo: Todo) => {
    setProcessingIds(prev => [...prev, todo.id]);

    try {
      const updated = await updateTodo({
        ...todo,
        completed: !todo.completed,
      });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch {
      showError(ErrorMessage.Update);
    } finally {
      setProcessingIds(prev => prev.filter(i => i !== todo.id));
    }
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

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header title={title} onChange={setTitle} onSubmit={handleAdd} />

        <TodoList
          todos={visibleTodos}
          processingIds={processingIds}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeCount={activeCount}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ErrorNotification error={error} onClose={() => setError('')} />
    </div>
  );
};
