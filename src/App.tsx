/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import {
  addTodos,
  getTodos,
  USER_ID,
  updateTodos,
  deleteTodos,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';
import { FilterStatus } from './types/FIlterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading, todos.length, error]);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timeout = setTimeout(() => setError(''), 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  const activeTodos = todos.filter(t => !t.completed && t.id !== 0);
  const completedTodos = todos.filter(t => t.completed);
  const allCompleted = todos.length > 0 && activeTodos.length === 0;

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === FilterStatus.Active) {
        return !todo.completed;
      }

      if (filter === FilterStatus.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Title should not be empty');

      return;
    }

    setLoading(true);
    setError('');

    const tempTodo: Todo = {
      id: 0,
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
      isLoading: true,
    };

    setTodos(prev => [...prev, tempTodo]);

    addTodos(trimmedTitle)
      .then(newTodo => {
        setTodos(prev => prev.map(todo => (todo.id === 0 ? newTodo : todo)));
        setTitle('');
      })
      .catch(() => {
        setError('Unable to add a todo');
        setTodos(prev => prev.filter(t => t.id !== 0));
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, isLoading: true } : t)),
    );

    deleteTodos(id)
      .then(() => {
        setTodos(prev => prev.filter(t => t.id !== id));
      })
      .catch(() => {
        setError('Unable to delete a todo');
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, isLoading: false } : t)),
        );
      });
  }, []);

  const handleUpdateTodo = useCallback((todo: Todo) => {
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? { ...t, isLoading: true } : t)),
    );

    updateTodos(todo.id, todo)
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
      })
      .catch(() => {
        setError('Unable to update a todo');
        setTodos(prev =>
          prev.map(t => (t.id === todo.id ? { ...t, isLoading: false } : t)),
        );
      });
  }, []);

  const handleRename = async (todo: Todo, newTitle: string) => {
  const trimmedTitle = newTitle.trim();

  if (trimmedTitle === todo.title) {
    return;
  }

  if (!trimmedTitle) {
     setError('Title should not be empty');
    throw new Error('Empty title');
  }

  setTodos(prev =>
    prev.map(t => (t.id === todo.id ? { ...t, isLoading: true } : t)),
  );

  try {
    const updatedTodo = await updateTodos(todo.id, {
      ...todo,
      title: trimmedTitle,
    });

    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? updatedTodo : t)),
    );
  } catch {
    setError('Unable to update a todo');
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? { ...t, isLoading: false } : t)),
    );
    throw new Error();
  }
};

  const handleToggleAll = () => {
    const targetStatus = !allCompleted;
    const itemsToUpdate = todos.filter(t => t.completed !== targetStatus);

    itemsToUpdate.forEach(t =>
      handleUpdateTodo({ ...t, completed: targetStatus }),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <form onSubmit={handleAddTodo}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
              onRename={handleRename}
            />
          ))}
        </section>

        {todos.length > 0 && (
          <Footer
            activeCount={activeTodos.length}
            currentFilter={filter}
            hasCompleted={completedTodos.length > 0}
            onFilterChange={setFilter}
            onClearCompleted={() =>
              completedTodos.forEach(t => handleDeleteTodo(t.id))
            }
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
