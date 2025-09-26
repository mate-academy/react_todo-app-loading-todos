/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loadingTodosIds, setLoadingTodosIds] = useState<number[]>([]);

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showError = useCallback((message: string) => {
    setErrorMessage(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  const hideError = useCallback(() => {
    setErrorMessage('');
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
  }, []);

  const focusInput = useCallback(() => {
    newTodoInputRef.current?.focus();
  }, []);

  const handleDeleteTodo = useCallback(
    async (id: number) => {
      setLoadingTodosIds(prev => [...prev, id]);

      try {
        await deleteTodo(id);
        setTodos(prev => prev.filter(todo => todo.id !== id));
        focusInput();
      } catch {
        showError('Unable to delete a todo');
      } finally {
        setLoadingTodosIds(prev => prev.filter(todoId => todoId !== id));
      }
    },
    [focusInput, showError],
  );

  const handleStartEditing = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = async (id: number) => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      await handleDeleteTodo(id);
      setEditingTodoId(null);
      return;
    }

    const originalTodo = todos.find(todo => todo.id === id);
    if (trimmedTitle === originalTodo?.title) {
      setEditingTodoId(null);
      return;
    }

    setLoadingTodosIds(prev => [...prev, id]);

    try {
      const updatedTodo = await updateTodo(id, { title: trimmedTitle });
      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
      setEditingTodoId(null);
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoadingTodosIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTitle('');
  };

  const handleEditKeyPress = (event: React.KeyboardEvent, id: number) => {
    if (event.key === 'Enter') {
      handleSaveEdit(id);
    } else if (event.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleAddTodo = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const trimmedTitle = newTodoTitle.trim();

      if (!trimmedTitle) {
        showError('Title should not be empty');
        focusInput();
        return;
      }

      const tempTodoData: Todo = {
        id: Date.now(),
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      };

      setTempTodo(tempTodoData);
      setNewTodoTitle('');

      try {
        const createdTodo = await createTodo({
          title: trimmedTitle,
          userId: USER_ID,
          completed: false,
        });

        if (!createdTodo.id) {
          createdTodo.id = Date.now();
        }

        setTodos(prev => [...prev, createdTodo]);
      } catch {
        showError('Unable to add a todo');
        setNewTodoTitle(trimmedTitle);
      } finally {
        setTempTodo(null);
        focusInput();
      }
    },
    [newTodoTitle, focusInput, showError],
  );

  const handleToggleTodo = useCallback(
    async (id: number, completed: boolean) => {
      setLoadingTodosIds(prev => [...prev, id]);

      try {
        const updatedTodo = await updateTodo(id, { completed: !completed });
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? updatedTodo : todo)),
        );
      } catch {
        showError('Unable to update a todo');
      } finally {
        setLoadingTodosIds(prev => prev.filter(todoId => todoId !== id));
      }
    },
    [showError],
  );

  const handleToggleAll = useCallback(async () => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.completed);

    const todosToUpdate = todos.filter(todo =>
      allCompleted ? todo.completed : !todo.completed,
    );

    if (todosToUpdate.length === 0) {
      return;
    }

    setLoadingTodosIds(prev => [
      ...prev,
      ...todosToUpdate.map(todo => todo.id),
    ]);

    try {
      const updatePromises = todosToUpdate.map(todo =>
        updateTodo(todo.id, { completed: !allCompleted }),
      );

      const updatedTodos = await Promise.all(updatePromises);

      setTodos(prev =>
        prev.map(todo => {
          const updatedTodo = updatedTodos.find(t => t.id === todo.id);
          return updatedTodo || todo;
        }),
      );
    } catch {
      showError('Unable to update todos');
    } finally {
      setLoadingTodosIds(prev =>
        prev.filter(id => !todosToUpdate.some(todo => todo.id === id)),
      );
    }
  }, [todos, showError]);

  const handleClearCompleted = useCallback(async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) return;

    setLoadingTodosIds(prev => [
      ...prev,
      ...completedTodos.map(todo => todo.id),
    ]);

    try {
      const deletePromises = completedTodos.map(todo => deleteTodo(todo.id));
      await Promise.all(deletePromises);
      setTodos(prev => prev.filter(todo => !todo.completed));
      focusInput();
    } catch {
      showError('Unable to delete completed todos');
    } finally {
      setLoadingTodosIds(prev =>
        prev.filter(id => !completedTodos.some(todo => todo.id === id)),
      );
    }
  }, [todos, focusInput, showError]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((loadedTodos: Todo[]) => {
        setTodos(loadedTodos || []);
      })
      .catch(() => {
        showError('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
        focusInput();
      });
  }, [focusInput, showError]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const shouldShowFooter = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosCount={todos.length}
          isAllCompleted={isAllCompleted}
          newTodoTitle={newTodoTitle}
          newTodoInputRef={newTodoInputRef}
          tempTodo={!!tempTodo}
          onAddTodo={handleAddTodo}
          onToggleAll={handleToggleAll}
          setNewTodoTitle={setNewTodoTitle}
        />

        <TodoList
          todos={filteredTodos}
          isLoading={isLoading}
          loadingTodosIds={loadingTodosIds}
          editingTodoId={editingTodoId}
          editingTitle={editingTitle}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onStartEditing={handleStartEditing}
          onEditChange={setEditingTitle}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onEditKeyPress={handleEditKeyPress}
          tempTodo={tempTodo}
        />

        {shouldShowFooter && (
          <Footer
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification message={errorMessage} onHide={hideError} />
    </div>
  );
};
