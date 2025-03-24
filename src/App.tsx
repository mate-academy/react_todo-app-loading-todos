/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodos, deleteTodos, getTodos, USER_ID } from './api/todos';
import { Header } from './component/Header';
import { Section } from './component/Section/Section';
import { Footer } from './component/Footer/Footer';
import { Todo } from './types/Todo';
import { Error } from './component/Error';
import { Loader } from './component/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessege, setErrorMessege] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setselectedFilter] = useState<string>(Filter.All);

  const loadTodos = async (): Promise<void> => {
    setErrorMessege(null);
    try {
      setLoading(false);
      setTodos(await getTodos());
    } catch {
      setLoading(true);
      setErrorMessege('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);
  useEffect(() => {
    if (errorMessege === null) {
      return;
    }

    const timer = setTimeout(() => setErrorMessege(null), 3000);

    return () => clearTimeout(timer);
  }, [errorMessege]);

  async function handleAddTodo(event: React.FormEvent) {
    event.preventDefault();
    if (!newTodo.trim()) {
      setErrorMessege('Title should not be empty');

      return;
    }

    try {
      setLoading(false);
      const createdTodo = await addTodos(newTodo);

      setTodos([...todos, createdTodo]);
      setNewTodo('');
    } catch {
      setLoading(true);
      setErrorMessege('Unable to add a todo');
    } finally {
      setLoading(false);
      setErrorMessege(null);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      setLoading(false);
      deleteTodos(id);
      setTodos(await getTodos());
    } catch {
      setLoading(true);
      setErrorMessege('Unable to delete a todo');
    } finally {
      setLoading(false);
    }
  }

  const filteredTodos = () => {
    switch (selectedFilter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
        return todos;
      default:
        return todos;
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
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
        />
        <Section todos={filteredTodos()} handleDeleteTodo={handleDeleteTodo} />
        {/*+ Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            selectedFilter={selectedFilter}
            setselectedFilter={setselectedFilter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>
      {loading && <Loader />}

      {(errorMessege === null || todos.length === 0) && (
        <Error errorMessege={errorMessege} setError={setErrorMessege} />
      )}
    </div>
  );
};
