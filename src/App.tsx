/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ShowError } from './components/ShowError';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status>(Status.All);

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.All) {
      return true;
    }

    if (filter === Status.Active) {
      return !todo.completed;
    }

    if (filter === Status.Completed) {
      return todo.completed;
    }

    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [error]);

  useEffect(() => {
    if (USER_ID) {
      setIsLoading(true);
      getTodos()
        .then(setTodos)
        .catch(() => {
          setError('Unable to load todos');
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    if (!newTodo.title.trim()) {
      setError('Title should not be empty');

      return;
    }

    postTodo(newTodo)
      .then(createdTodo => {
        setTodos(currentTodo => [...currentTodo, createdTodo]);
      })
      .catch(() => {
        setError('Unable to add a todo');
      });
  };

  const toggleTodoCompleted = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    patchTodo(id, { completed: !todo.completed })
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)));
      })
      .catch(() => {
        setError('Unable to update a todo');
      });
  };

  const deleteTodoById = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(prev => prev.filter(t => t.id !== id));
      })
      .catch(() => {
        setError('Unable to delete a todo');
      });
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    patchTodo(id, { title: newTitle })
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === id ? updatedTodo : t)));
      })
      .catch(() => {
        setError('Unable to update a todo');
      });
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onSubmit={addTodo} todos={todos} />

        <TodoList
          filteredTodos={filteredTodos}
          isLoading={isLoading}
          toggleTodoCompleted={toggleTodoCompleted}
          deleteTodo={deleteTodoById}
          updateTodoTitle={updateTodoTitle}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            clearCompleted={clearCompleted}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      <ShowError error={error} handleError={handleError} />
    </div>
  );
};
