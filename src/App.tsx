/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { ClearCompletedButton } from './components/ClearCompletedButton';
import { ErrorNotification } from './components/ErrorNotification';
import { Filter } from './components/Filter';
import { NewTodo } from './components/NewTodo';
import { ToggleAllButton } from './components/ToggleAllButton';
import { TodoList } from './components/TodoList';
import { FILTERS, Status, TODOMessages } from './constants/todo';
import {
  USER_ID,
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

function getVisibleTodos(todos: Todo[], status: Status): Todo[] {
  switch (status) {
    case FILTERS.active:
      return todos.filter(todo => !todo.completed);

    case FILTERS.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(FILTERS.all);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const idCounter = useRef(0);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!USER_ID) {
      return undefined;
    }

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(TODOMessages.UnableToLoad));

    return undefined;
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return undefined;
    }

    const timerId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  useEffect(() => {
    titleField.current?.focus();
  }, [tempTodo, todos.length]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getVisibleTodos(todos, status);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);
  const isAllCompleted = todos.length > 0 && activeCount === 0;

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage(TODOMessages.EmptyTitle);

      return;
    }

    setErrorMessage('');
    setTempTodo({
      id: ++idCounter.current,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    addTodo(trimmedTitle)
      .then(newTodo => {
        setTodos(current => [...current, newTodo]);
        setTitle('');
      })
      .catch(() => setErrorMessage(TODOMessages.UnableToAdd))
      .finally(() => setTempTodo(null));
  };

  const handleDelete = async (todoId: number) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, todoId]);

    try {
      await deleteTodo(todoId);
      setTodos(current => current.filter(todo => todo.id !== todoId));
    } catch {
      setErrorMessage(TODOMessages.UnableToDelete);
    } finally {
      setLoadingIds(current => current.filter(id => id !== todoId));
    }
  };

  const handleToggle = async (todoId: number, completed: boolean) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, todoId]);

    try {
      await updateTodo(todoId, { completed });

      setTodos(current =>
        current.map(todo =>
          todo.id === todoId ? { ...todo, completed } : todo,
        ),
      );
    } catch {
      setErrorMessage(TODOMessages.UnableToUpdate);
    } finally {
      setLoadingIds(current => current.filter(id => id !== todoId));
    }
  };

  const handleRename = async (todoId: number, newTitle: string) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, todoId]);

    try {
      await updateTodo(todoId, { title: newTitle });

      setTodos(current =>
        current.map(todo =>
          todo.id === todoId ? { ...todo, title: newTitle } : todo,
        ),
      );
    } catch (error) {
      setErrorMessage(TODOMessages.UnableToUpdate);
      throw error;
    } finally {
      setLoadingIds(current => current.filter(id => id !== todoId));
    }
  };

  const handleToggleAll = async () => {
    const nextCompleted = !isAllCompleted;
    const todosToUpdate = todos.filter(
      todo => todo.completed !== nextCompleted,
    );

    await Promise.all(
      todosToUpdate.map(todo => handleToggle(todo.id, nextCompleted)),
    );
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    await Promise.all(completedTodos.map(todo => handleDelete(todo.id)));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <ToggleAllButton
              isActive={isAllCompleted}
              onToggleAll={handleToggleAll}
            />
          )}

          <NewTodo
            title={title}
            disabled={tempTodo !== null}
            onChange={handleTitleChange}
            onSubmit={handleSubmit}
            inputRef={titleField}
          />
        </header>

        {(todos.length > 0 || tempTodo) && (
          <TodoList
            todos={visibleTodos}
            tempTodo={tempTodo}
            loadingIds={loadingIds}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onRename={handleRename}
          />
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeCount} items left`}
            </span>

            <Filter status={status} onStatusChange={setStatus} />

            <ClearCompletedButton
              disabled={!hasCompleted}
              onClick={handleClearCompleted}
            />
          </footer>
        )}
      </div>

      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
