/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { Filter } from './types/Filter';
import { getTodos, createTodo, deleteTodo, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const inputRef = useRef<HTMLInputElement>(null);

  const showError = useCallback((msg: ErrorMessage) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        showError(ErrorMessage.LOAD);
      });
  }, [showError]);

  useEffect(() => {
    if (!isSubmitting) {
      inputRef.current?.focus();
    }
  }, [isSubmitting]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      showError(ErrorMessage.TITLE_EMPTY);
      return;
    }

    setIsSubmitting(true);

    const newTempTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo(newTempTodo);

    createTodo({
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    })
      .then((createdTodo) => {
        setTodos((prevTodos) => [...prevTodos, createdTodo]);
        setTitle('');
      })
      .catch(() => {
        showError(ErrorMessage.ADD);
      })
      .finally(() => {
        setTempTodo(null);
        setIsSubmitting(false);
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    setLoadingTodoIds((prev) => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
      })
      .catch(() => {
        showError(ErrorMessage.DELETE);
      })
      .finally(() => {
        setLoadingTodoIds((prev) => prev.filter((id) => id !== todoId));
      });
  };

  const handleClearCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo) => {
      handleDeleteTodo(todo.id);
    });
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === Filter.ACTIVE) return !todo.completed;
    if (filter === Filter.COMPLETED) return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);
  const showContent = todos.length > 0 || tempTodo;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todosCount={todos.length}
          activeCount={activeCount}
          title={title}
          isSubmitting={isSubmitting}
          inputRef={inputRef}
          setTitle={setTitle}
          onSubmit={handleAddTodo}
        />

        {showContent && (
          <TodoList
            todos={visibleTodos}
            tempTodo={tempTodo}
            loadingTodoIds={loadingTodoIds}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {showContent && (
          <Footer
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};