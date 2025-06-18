/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import type { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import TodoList from './components/todoList';
import Header from './components/header';
import Footer from './components/Footer';
import Error from './components/Error';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);
  const [filtered, setFiltered] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editIdValue, setEditIdValue] = useState<string>('');
  const [addInput, setAddInput] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        setAllTodos(todosFromServer);
        setFiltered(todosFromServer);
      } catch {
        setError('Unable to load todos');
        setAllTodos([]);
        setFiltered([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const filteredTodos: Todo[] | null = allTodos?.filter(todo => {
      if (filter === 'completed') {
        return todo.completed;
      }

      if (filter === 'active') {
        return !todo.completed;
      }

      return true;
    });

    setFiltered(filteredTodos);
  }, [allTodos, filter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addInput={addInput} setAddInput={setAddInput} />

        <TodoList
          filtered={filtered}
          editId={editId}
          setEditId={setEditId}
          editIdValue={editIdValue}
          setEditIdValue={setEditIdValue}
        />

        {!(filtered?.length === 0 && filter === 'all') && (
          <Footer
            allTodos={allTodos}
            filtered={filtered}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <Error error={error} setError={setError} />
    </div>
  );
};
