/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { USER_ID, addTodo, deleteTodo, getTodos, patchTodo } from './api/todos';
import { Header, Footer, TodoList, ErrorNotification } from './components';
import { Todo } from './types/Todo';

enum ERROR {
  load,
  title,
  add,
  delete,
  update,
}

const errorMessage: Record<ERROR, string> = {
  [ERROR.load]: 'Unable to load todos',
  [ERROR.title]: 'Title should not be empty',
  [ERROR.add]: 'Unable to add a todo',
  [ERROR.delete]: 'Unable to delete a todo',
  [ERROR.update]: 'Unable to update a todo',
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<(Todo & { loading?: boolean })[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState<ERROR | null>(null);
  const [showError, setShowError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    if (error !== null) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError(ERROR.load);
      });
  }, []);

  const handleDelete = (id: number) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, loading: true } : todo)),
    );

    deleteTodo(id)
      .then(() => {
        setTimeout(() => {
          setTodos(prev => prev.filter(todo => todo.id !== id));
        }, 200);
      })
      .catch(() => {
        setError(ERROR.delete);
      });
  };

  const handleUpdate = (id: number, title: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, title, loading: true } : todo,
      ),
    );

    patchTodo(id, { title })
      .then(updatedTodo => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...updatedTodo, loading: false } : todo,
          ),
        );
      })
      .catch(() => {
        setError(ERROR.update);
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, loading: false } : todo,
          ),
        );
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      setError(ERROR.title);

      return;
    }

    const tempId = Date.now();

    const newTodo: Todo & { loading: boolean } = {
      id: tempId,
      userId: USER_ID,
      title: query.trim(),
      completed: false,
      loading: true,
    };

    setTodos(prev => [...prev, newTodo]);
    setQuery('');

    addTodo({
      userId: USER_ID,
      title: query.trim(),
      completed: false,
    })
      .then(todoFromServer => {
        setTimeout(() => {
          setTodos(prev =>
            prev.map(current =>
              current.id === tempId
                ? { ...todoFromServer, loading: false }
                : current,
            ),
          );
        }, 200);
      })
      .catch(() => {
        setError(ERROR.add);
        setTodos(prev => prev.filter(t => t.id !== tempId));
      });
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
          toggleAll={toggleAll}
          hasTodos={todos.length > 0}
        />

        <TodoList
          todos={visibleTodos}
          toggleTodo={toggleTodo}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />

        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            todosLeft={todos.filter(t => !t.completed).length}
            hasCompleted={todos.some(t => t.completed)}
            clearCompleted={clearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        message={error !== null ? errorMessage[error] : null}
        show={showError}
        onClose={() => {
          setShowError(false);
          setError(null);
        }}
      />
    </div>
  );
};
