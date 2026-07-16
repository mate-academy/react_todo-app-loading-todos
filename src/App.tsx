import React, { useEffect, useState, useRef, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { ErrorMessage } from './types/ErrorMessage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMsg, setErrorMsg] = useState<ErrorMessage>(ErrorMessage.NoError);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: ErrorMessage) => {
    setErrorMsg(message);
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    errorTimerRef.current = setTimeout(
      () => setErrorMsg(ErrorMessage.NoError),
      3000,
    );
  };

  useEffect(() => {
    setErrorMsg(ErrorMessage.NoError);
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.UnableToLoad));
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting, todos]);

  useEffect(() => {
    if (editingId !== null) {
      editInputRef.current?.focus();
    }
  }, [editingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    setErrorMsg(ErrorMessage.NoError);

    if (!trimmed) {
      showError(ErrorMessage.EmptyTitle);

      return;
    }

    setIsSubmitting(true);

    const temp: Todo = {
      id: 0,
      userId: USER_ID,
      title: trimmed,
      completed: false,
    };

    setTempTodo(temp);

    addTodo(trimmed)
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTitle('');
      })
      .catch(() => showError(ErrorMessage.UnableToAdd))
      .finally(() => {
        setTempTodo(null);
        setIsSubmitting(false);
      });
  };

  const handleDelete = useCallback((id: number) => {
    setErrorMsg(ErrorMessage.NoError);
    setLoadingIds(prev => [...prev, id]);

    deleteTodo(id)
      .then(() => {
        setTodos(prev => prev.filter(t => t.id !== id));
        inputRef.current?.focus();
      })
      .catch(() => showError(ErrorMessage.UnableToDelete))
      .finally(() => {
        setLoadingIds(prev => prev.filter(i => i !== id));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearCompleted = () => {
    const completed = todos.filter(t => t.completed);

    completed.forEach(todo => handleDelete(todo.id));
  };

  const handleToggle = (todo: Todo) => {
    setErrorMsg(ErrorMessage.NoError);
    setLoadingIds(prev => [...prev, todo.id]);

    updateTodo(todo.id, { completed: !todo.completed })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      })
      .catch(() => showError(ErrorMessage.UnableToUpdate))
      .finally(() => {
        setLoadingIds(prev => prev.filter(i => i !== todo.id));
      });
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(t => t.completed);
    const toToggle = allCompleted ? todos : todos.filter(t => !t.completed);

    toToggle.forEach(todo => handleToggle(todo));
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleEditSave = (todo: Todo) => {
    const trimmed = editTitle.trim();

    if (trimmed === todo.title) {
      setEditingId(null);

      return;
    }

    if (!trimmed) {
      handleDelete(todo.id);
      setEditingId(null);

      return;
    }

    setErrorMsg(ErrorMessage.NoError);
    setLoadingIds(prev => [...prev, todo.id]);

    updateTodo(todo.id, { title: trimmed })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
        setEditingId(null);
      })
      .catch(() => showError(ErrorMessage.UnableToUpdate))
      .finally(() => {
        setLoadingIds(prev => prev.filter(i => i !== todo.id));
      });
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, todo: Todo) => {
    if (e.key === 'Enter') {
      handleEditSave(todo);
    }

    if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === FilterStatus.Active) {
      return !todo.completed;
    }

    if (filter === FilterStatus.Completed) {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);
  const allCompleted = todos.every(t => t.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          isSubmitting={isSubmitting}
          hasTodos={todos.length > 0}
          allCompleted={allCompleted}
          inputRef={inputRef}
          onTitleChange={setTitle}
          onSubmit={handleSubmit}
          onToggleAll={handleToggleAll}
        />

        {(todos.length > 0 || tempTodo) && (
          <>
            <TodoList
              todos={filteredTodos}
              tempTodo={tempTodo}
              editingId={editingId}
              editTitle={editTitle}
              loadingIds={loadingIds}
              editInputRef={editInputRef}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onDoubleClick={handleDoubleClick}
              onEditTitleChange={setEditTitle}
              onEditSave={handleEditSave}
              onEditKeyDown={handleEditKeyDown}
            />

            <Footer
              activeTodosCount={activeTodosCount}
              filter={filter}
              hasCompleted={hasCompleted}
              onFilterChange={setFilter}
              onClearCompleted={handleClearCompleted}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMsg={errorMsg}
        onHide={() => setErrorMsg(ErrorMessage.NoError)}
      />
    </div>
  );
};
