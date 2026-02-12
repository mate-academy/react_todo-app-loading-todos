/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export enum ErrorText {
  EmptyTitle = 'Title should not be empty',
  AddFailed = 'Unable to add a todo',
  UpdateFailed = 'Unable to update a todo',
  DeleteFailed = 'Unable to delete a todo',
  LoadFailed = 'Unable to load todos',
}

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type FilterType = Filter.All | Filter.Active | Filter.Completed;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterType>(Filter.All);
  const [newTitle, setNewTitle] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();

    if (!trimmed) {
      setError(ErrorText.EmptyTitle);
      inputRef.current?.focus();

      return;
    }

    const temp: Todo = {
      id: 0,
      userId: USER_ID,
      title: trimmed,
      completed: false,
    };

    setTempTodo(temp);
    setIsAdding(true);

    setError('');

    try {
      const newTodo = await todoService.postTodos({
        title: trimmed,
        userId: USER_ID,
      });

      setTodos(prev => [...prev, newTodo]);
      setNewTitle('');
      inputRef.current?.focus();
    } catch {
      setError(ErrorText.AddFailed);
      inputRef.current?.focus();
    } finally {
      setIsAdding(false);
      setTempTodo(null);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    setLoadingTodoId(todo.id);
    setError('');

    try {
      await todoService.patchTodo(todo.id, { completed: !todo.completed });
      setTodos(prev =>
        prev.map(existingTodo =>
          existingTodo.id === todo.id
            ? { ...existingTodo, completed: !existingTodo.completed }
            : existingTodo,
        ),
      );
    } catch {
      setError(ErrorText.UpdateFailed);
    } finally {
      setLoadingTodoId(null);
    }
  };

  const clearCompleted = async () => {
    setError('');

    const completed = todos.filter(t => t.completed);

    await Promise.allSettled(
      completed.map(async todo => {
        setLoadingTodoId(todo.id);

        try {
          await todoService.deleteTodo(todo.id);
          setTodos(prev => prev.filter(t => t.id !== todo.id));
        } catch {
          setError(ErrorText.DeleteFailed);
        } finally {
          setLoadingTodoId(null);
        }
      }),
    );
  };

  const handleDeleteTodo = async (todoId: number) => {
    setLoadingTodoId(todoId);
    setError('');
    try {
      await todoService.deleteTodo(todoId);
      setTodos(prev => prev.filter(t => t.id !== todoId));
    } catch {
      setError(ErrorText.DeleteFailed);
    } finally {
      setLoadingTodoId(null);
    }
  };

  const filterTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    inputRef.current?.focus();
    setError('');
    todoService
      .getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(() => {
        setError(ErrorText.LoadFailed);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          newTitle={newTitle}
          isAdding={isAdding}
          inputRef={inputRef}
          onSubmit={handleAddTodo}
          onTitleChange={setNewTitle}
        />

        <TodoList
          todos={filterTodos}
          tempTodo={tempTodo}
          loadingTodoId={loadingTodoId}
          onToggledTodo={toggleTodo}
          onDelete={handleDeleteTodo}
        />

        <Footer
          todos={todos}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>

      <ErrorNotification error={error} onErrorDeleat={() => setError('')} />
    </div>
  );
};
