/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, getTodos, updateCompleted, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Error } from './components/Error';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();

      setTodos(data);
    } catch {
      setErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    try {
      const data = await addTodo(title);

      setTodos(currentTodos => [...currentTodos, data]);
    } catch {
      setErrorMessage('Unable to add a todo');
    }
  };

  // const handleDeleteTodo = async (id: number) => {
  //   try {
  //     // Delete todo
  //   } catch {
  //     setErrorMessage('Unable to delete a todo');
  //   }
  // };

  // const handleUpdateTodo = async (id: number) => {
  //   try {
  //     // Update todo
  //   } catch {
  //     setErrorMessage('Unable to update a todo');
  //   }
  // };

  const toggleTodo = async (todo: Todo) => {
    try {
      const data = await updateCompleted(todo.id, !todo.completed);

      setTodos(currentTodos =>
        currentTodos.map(t => (t.id === todo.id ? data : t)),
      );
    } catch {
      setErrorMessage('Unable to update a todo');
    }
  };

  useEffect(() => {
    const filtered = todos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });

    setFilteredTodos(filtered);
  }, [status, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleAddTodo(query);
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>
        </header>

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          loading={loading}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer todos={todos} status={status} onStatusChange={setStatus} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error
        errorMessage={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
