import React, { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { Header } from './components/header';
import { TodoList } from './components/todolist';
import { Footer } from './components/footer';
import { ErrorNotification } from './components/error';
import {
  USER_ID,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './enums/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [savingIds, setSavingIds] = useState<number[]>([]);

  const errorTimeoutRef = useRef<number>();

  const showError = useCallback((msg: string) => {
    clearTimeout(errorTimeoutRef.current);
    setErrorMsg(msg);
    errorTimeoutRef.current = window.setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
  }, []);

  const clearError = useCallback(() => {
    clearTimeout(errorTimeoutRef.current);
    setErrorMsg(null);
  }, []);

  const loadTodos = useCallback(async () => {
    clearError();
    setLoading(true);
    try {
      const response = await getTodos();

      setTodos(response);
    } catch {
      showError('Unable to load todos');
    } finally {
      setLoading(false);
    }
  }, [clearError, showError]);

  useEffect(() => {
    if (USER_ID) {
      loadTodos();
    }
  }, [loadTodos]);

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const allCompleted = todos.length > 0 && todos.every(t => t.completed);
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  const handleAddTodo = async (title: string) => {
    if (!title.trim()) {
      showError('Title should not be empty');

      return;
    }

    clearError();
    setLoading(true);
    try {
      const newTodo = await addTodo(title.trim());

      setTodos(prev => [...prev, newTodo]);
      setNewTitle('');
    } catch {
      showError('Unable to add a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAll = async () => {
    clearError();
    setLoading(true);
    try {
      const updatedTodos = await Promise.all(
        todos.map(t => updateTodo({ ...t, completed: !allCompleted })),
      );

      setTodos(updatedTodos);
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCompleted = async () => {
    clearError();
    setLoading(true);
    try {
      await Promise.all(
        todos.filter(t => t.completed).map(t => deleteTodo(t.id)),
      );
      setTodos(prev => prev.filter(t => !t.completed));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    clearError();
    setSavingIds(ids => [...ids, todo.id]);
    try {
      const updated = await updateTodo({ ...todo, completed: !todo.completed });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch {
      showError('Unable to update a todo');
    } finally {
      setSavingIds(ids => ids.filter(id => id !== todo.id));
    }
  };

  const handleRemoveTodo = async (id: number) => {
    clearError();
    setSavingIds(ids => [...ids, id]);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch {
      showError('Unable to delete a todo');
    } finally {
      setSavingIds(ids => ids.filter(i => i !== id));
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    if (editingId === null) {
      return;
    }

    if (!editingTitle.trim()) {
      await handleRemoveTodo(editingId);
      cancelEdit();

      return;
    }

    clearError();
    setSavingIds(ids => [...ids, editingId]);
    try {
      const updated = await updateTodo({
        id: editingId,
        userId: USER_ID,
        title: editingTitle.trim(),
        completed: todos.find(t => t.id === editingId)?.completed ?? false,
      });

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      cancelEdit();
    } catch {
      showError('Unable to update a todo');
    } finally {
      setSavingIds(ids => ids.filter(id => id !== editingId));
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterType.Active) {
      return !todo.completed;
    }

    if (filter === FilterType.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      {!USER_ID ? (
        <div>Please register user first</div>
      ) : (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header
              allCompleted={allCompleted}
              onToggleAll={handleToggleAll}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              onAddTodo={handleAddTodo}
              clearError={clearError}
            />

            {todos.length > 0 && (
              <>
                <TodoList
                  todos={filteredTodos}
                  savingIds={savingIds}
                  editingId={editingId}
                  editingTitle={editingTitle}
                  onToggleTodo={handleToggleTodo}
                  onRemoveTodo={handleRemoveTodo}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  setEditingTitle={setEditingTitle}
                />

                <Footer
                  activeCount={activeCount}
                  completedCount={completedCount}
                  filter={filter}
                  setFilter={setFilter}
                  onClearCompleted={handleClearCompleted}
                />
              </>
            )}
          </div>

          <ErrorNotification
            errorMsg={errorMsg}
            onClose={() => setErrorMsg(null)}
          />

          <div
            data-cy="LoadingOverlay"
            className={classNames('modal overlay', { 'is-active': loading })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};
