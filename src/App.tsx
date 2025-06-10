import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';

import {
  addTodos,
  deleteTodos,
  getTodos,
  USER_ID,
  uppTodos,
} from './api/todos';
import { Header } from './components/Header';
import { Section } from './components/Section/Section';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setselectedFilter] = useState<string>(Filter.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingId, setloadingId] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');

  const loadTodos = async (): Promise<void> => {
    setLoading(true);
    try {
      setTodos(await getTodos());
    } catch {
      setErrorMessege('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setErrorMessege('Title should not be empty');

      return;
    }

    setLoading(true);

    const addTodo = {
      id: todos.length + 1,
      userId: USER_ID,
      title: newTodo.trim(),
      completed: false,
    };

    try {
      setTempTodo(addTodo);
      setTodos([...todos, await addTodos(addTodo)]);
      setNewTodo('');
    } catch {
      setErrorMessege('Unable to add a todo');
    } finally {
      setTempTodo(null);
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    setloadingId(prev => [...prev, id]);
    setLoading(true);
    try {
      await deleteTodos(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch {
      setErrorMessege('Unable to delete a todo');
    } finally {
      setLoading(false);
      setloadingId([]);
    }
  };

  const filteredTodos = () => {
    switch (selectedFilter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        handleDeleteTodo(todo.id);
      }
    });
  };

  const handleUppAllCompleted = async () => {
    setLoading(true);
    try {
      const allCompleted =
        todos.length === todos.filter(todo => todo.completed === true).length;

      if (allCompleted) {
        await Promise.all(
          todos
            .filter(todo => todo.completed === true)
            .map(todo => uppTodos(todo.id, { completed: false })),
        );
      } else {
        await Promise.all(
          todos
            .filter(todo => todo.completed === false)
            .map(todo => uppTodos(todo.id, { completed: true })),
        );
      }

      setTodos(prevTodos =>
        prevTodos.map(todo => ({
          ...todo,
          completed: !allCompleted,
        })),
      );
    } catch (error) {
      setErrorMessege('Unable to update todos');
    } finally {
      setLoading(false);
    }
  };

  const handleUppCompleted = async (todo: Todo) => {
    setloadingId(prev => [...prev, todo.id]);
    const uppComplit = {
      userId: todo.userId,
      title: todo.title,
      completed: todo.completed === false ? true : false,
    };

    try {
      await uppTodos(todo.id, uppComplit);
      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? { ...t, completed: uppComplit.completed } : t,
        ),
      );
    } catch (error) {
      setErrorMessege('Unable to update a todo');
    } finally {
      setLoading(false);
      setloadingId([]);
    }
  };

  const handleUppEdit = async (todo: Todo) => {
    setLoading(true);
    setloadingId(prev => [...prev, todo.id]);

    try {
      await uppTodos(todo.id, { title: newTitle.trim() });
      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? { ...t, title: newTitle.trim() } : t,
        ),
      );
    } catch (error) {
      setLoading(false);
      setloadingId([]);
      setErrorMessege('Unable to update a todo');
      setTodos(prevTodos =>
        prevTodos.map(t =>
          t.id === todo.id ? { ...t, title: newTitle.trim() } : t,
        ),
      );
      throw error;
    } finally {
      setLoading(false);
      setNewTitle('');
      setloadingId([]);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          todos={todos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          loading={loading}
          handleAddTodo={handleAddTodo}
          loadTodos={loadTodos}
          handleUppAllCompleted={handleUppAllCompleted}
        />
        {todos.length > 0 && (
          <>
            <Section
              tempTodo={tempTodo}
              todos={filteredTodos()}
              handleDeleteTodo={handleDeleteTodo}
              loading={loading}
              loadingId={loadingId}
              handleUppCompleted={handleUppCompleted}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              handleUppEdit={handleUppEdit}
              setLoading={setLoading}
            />
            {todos.length > 0 && (
              <Footer
                todos={todos}
                selectedFilter={selectedFilter}
                setselectedFilter={setselectedFilter}
                handleClearCompleted={handleClearCompleted}
              />
            )}
          </>
        )}
      </div>

      <Error errorMessege={errorMessege} setError={setErrorMessege} />
    </div>
  );
};
