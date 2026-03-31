/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filters';
import { TempTodo } from './components/TempTodo';

import { addTodo, getTodos, deleteTodo, USER_ID } from './api/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch {
        showError('Unable to load todos');
      }
    };

    loadTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      showError('Title should not be empty');

      return;
    }

    setIsAdding(true);

    const temp = {
      id: 0,
      title,
      completed: false,
    };

    setTempTodo(temp);

    try {
      const newTodo = await addTodo({
        title,
        completed: false,
        userId: USER_ID,
      });

      setTodos(prev => [...prev, newTodo]);
      setNewTitle('');
    } catch {
      showError('Unable to add a todo');
    } finally {
      setIsAdding(false);
      setTempTodo(null);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleClearCompleted = async () => {
    const completed = todos.filter(t => t.completed);
    const ids = completed.map(t => t.id);

    setDeletingIds(prev => [...prev, ...ids]);

    try {
      await Promise.all(ids.map(id => deleteTodo(id)));
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      showError('Unable to delete todos');
    } finally {
      setDeletingIds(prev => prev.filter(id => !ids.includes(id)));
    }
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;

      case Filter.Completed:
        return todo.completed;

      case Filter.All:
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          onSubmit={handleSubmit}
          isAdding={isAdding}
          allCompleted={todos.every(t => t.completed)}
        />

        {(todos.length > 0 || tempTodo) && (
          <section className="todoapp__main" data-cy="TodoList">
            {tempTodo && <TempTodo todo={tempTodo} />}

            <TodoList
              todos={visibleTodos}
              deletingIds={deletingIds}
              onDelete={handleDelete}
            />
          </section>
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification error={error} onClose={() => setError(null)} />
    </div>
  );
};
