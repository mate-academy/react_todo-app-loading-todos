import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { client } from './utils/fetchClient';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { TodoList } from './TodoList/TodoList';

enum Error {
  NONE = '',
  LOAD_TODOS = 'Unable to load todos',
  EMPTY_TITLE = 'Title should not be empty',
  ADD_TODO = 'Unable to add a todo',
  DELETE_TODO = 'Unable to delete a todo',
  UPDATE_TODO = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<Error>(Error.NONE);

  useEffect(() => {
    if (errorType !== Error.NONE) {
      const timer = setTimeout(() => {
        setErrorType(Error.NONE);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [errorType]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const visibleCount = filteredTodos.length;
  const hasCompleted = todos.some(todo => todo.completed);
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const updateTodo = (id: number, data: Partial<Todo>): Promise<Todo> => {
    return client.patch<Todo>(`/todos/${id}`, data);
  };

  const handleToggle = async (todo: Todo) => {
    setLoadingTodoId(todo.id);
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });

      setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t)));
      setErrorType(Error.NONE);
    } catch {
      setErrorType(Error.UPDATE_TODO);
    } finally {
      setLoadingTodoId(null);
    }
  };

  const handleDelete = (id: number) => {
    client
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        setErrorType(Error.NONE);
      })
      .catch(() => setErrorType(Error.DELETE_TODO));
  };

  const handleClearAll = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => client.delete(`/todos/${todo.id}`)))
      .then(() => {
        setTodos(prev => prev.filter(todo => !todo.completed));
        setErrorType(Error.NONE);
      })
      .catch(() => setErrorType(Error.DELETE_TODO));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      setErrorType(Error.EMPTY_TITLE);

      return;
    }

    const newTodo = {
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    };

    client
      .post<Todo>('/todos', newTodo)
      .then(added => {
        setTodos(prev => [...prev, added]);
        setTitle('');
        setTitleError(false);
        setErrorType(Error.NONE);
      })
      .catch(() => setErrorType(Error.ADD_TODO));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setErrorType(Error.LOAD_TODOS);
        setLoading(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (isLoading) {
    return (
      <div className="todoapp">
        <div className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" data-cy="TodoLoader" />
        </div>
      </div>
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          title={title}
          titleError={titleError}
          allCompleted={allCompleted}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setTitleError={setTitleError}
          setErrorNone={() => setErrorType(Error.NONE)}
          onToggleAll={() => {
            const newCompleted = !allCompleted;

            Promise.all(
              todos.map(todo =>
                updateTodo(todo.id, { completed: newCompleted }),
              ),
            )
              .then(updatedTodos => {
                setTodos(updatedTodos);
                setErrorType(Error.NONE);
              })
              .catch(() => setErrorType(Error.UPDATE_TODO));
          }}
        />

        <TodoList
          todos={filteredTodos}
          loadingTodoId={loadingTodoId}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />

        {todos.length > 0 && (
          <Footer
            filter={filter}
            onFilterChange={setFilter}
            hasCompleted={hasCompleted}
            onClearCompleted={handleClearAll}
            visibleCount={visibleCount}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorType !== Error.NONE ? '' : 'hidden'
        }`}
        role="alert"
        aria-live="assertive"
      >
        {errorType !== Error.NONE && (
          <>
            <button
              data-cy="HideErrorButton"
              type="button"
              className="delete"
              aria-label="Close error notification"
              onClick={() => setErrorType(Error.NONE)}
            />
            {errorType}
          </>
        )}
      </div>
    </div>
  );
};
