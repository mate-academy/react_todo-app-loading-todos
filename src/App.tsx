/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
import { Footer } from './components/Footer';
import { Filter } from './types/FilterMethods';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Filter>('All');
  /*const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);*/

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setError(null);
      })
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [error]);

  const filteredTodos = todos.filter(todo => {
    if (status === 'Active') {
      return !todo.completed;
    }

    if (status === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const countOfItemsLeft = (elements: Todo[]) => {
    const filtered = elements.filter(element => element.completed === false);

    return filtered.length;
  };

  const handleAllToggleTodo = () => {
    const areAllCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(current => current.filter(element => element.completed === false));
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          allCompleted={allCompleted}
          toggleAll={handleAllToggleTodo}
          title={title}
          handleTitleChange={handleTitleChange}
        />

        <TodoList todos={filteredTodos} loading={loading} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            count={countOfItemsLeft}
            todos={todos}
            setMethod={setStatus}
            filterMethod={status}
            clear={clearCompleted}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} />
    </div>
  );
};
