import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import {
  deleteTodo,
  getTodos,
  patchTodo,
  postTodo,
  USER_ID,
} from './api/todos';
import { FILTERS, Filter } from './constants/filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(FILTERS.all);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);

  async function loadTodos() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getTodos();

      setTodos(data);
    } catch {
      setErrorMessage('Unable to load todos');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [errorMessage]);

  const addLoadingTodo = (todoId: number) => {
    setLoadingTodoIds(current => [...current, todoId]);
  };

  const removeLoadingTodo = (todoId: number) => {
    setLoadingTodoIds(current => current.filter(id => id !== todoId));
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditTitle(event.target.value);
  };

  const handleDelete = (todoId: number) => {
    addLoadingTodo(todoId);

    deleteTodo(todoId)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
      })
      .finally(() => {
        removeLoadingTodo(todoId);
      });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setErrorMessage('');

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    postTodo({
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    })
      .then(newTodo => {
        setTodos(currentTodos => [...currentTodos, newTodo]);
        setTitle('');
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
      });
  };

  const toggleTodo = (todo: Todo) => {
    addLoadingTodo(todo.id);

    patchTodo({ ...todo, completed: !todo.completed })
      .then(savedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(currentTodo =>
            currentTodo.id === todo.id ? savedTodo : currentTodo,
          ),
        );
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => {
        removeLoadingTodo(todo.id);
      });
  };

  const handleToggleAll = (currentTodos: Todo[]) => {
    if (currentTodos.every(todo => todo.completed)) {
      currentTodos.forEach(toggleTodo);

      return;
    }

    currentTodos.forEach(todo => {
      if (!todo.completed) {
        toggleTodo(todo);
      }
    });
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditTitle(todo.title);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const handleSaveEdit = (event: React.FormEvent, todo: Todo) => {
    event.preventDefault();

    const trimmedEditTitle = editTitle.trim();

    if (trimmedEditTitle === todo.title) {
      setEditingTodoId(null);

      return;
    }

    if (!trimmedEditTitle) {
      handleDelete(todo.id);

      return;
    }

    addLoadingTodo(todo.id);

    patchTodo({ ...todo, title: trimmedEditTitle })
      .then(savedTodo => {
        setTodos(currentTodos =>
          currentTodos.map(currentTodo =>
            currentTodo.id === todo.id ? savedTodo : currentTodo,
          ),
        );
        setEditingTodoId(null);
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => {
        removeLoadingTodo(todo.id);
      });
  };

  const handleClearCompleted = (currentTodos: Todo[]) => {
    currentTodos.forEach(todo => {
      if (todo.completed) {
        handleDelete(todo.id);
      }
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <NewTodoForm
          hasTodos={todos.length > 0}
          isAllCompleted={
            todos.length > 0 && todos.every(todo => todo.completed)
          }
          title={title}
          todos={todos}
          onTitleChange={handleTitleChange}
          onSubmit={handleSubmit}
          onToggleAll={handleToggleAll}
        />

        {todos.length > 0 && (
          <TodoList
            todos={visibleTodos}
            editingTodoId={editingTodoId}
            editTitle={editTitle}
            loadingTodoIds={loadingTodoIds}
            isLoading={isLoading}
            onToggle={toggleTodo}
            onDelete={handleDelete}
            onStartEdit={handleStartEdit}
            onEditTitleChange={handleEditTitleChange}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onHide={() => setErrorMessage('')}
      />
    </div>
  );
};
