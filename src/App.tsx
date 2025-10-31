/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FilterStatus, ErrorText } from './types/ui';

const TEMP_TODO_ID = 0;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const errorHideTimerId = window.setTimeout(() => setErrorMessage(''), 3000);

    return () => window.clearTimeout(errorHideTimerId);
  }, [errorMessage]);

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorText.Load))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    newTodoFieldRef.current?.focus();
  }, [todos.length, isAdding, loadingTodoIds.length]);

  const visibleTodos = useMemo(() => {
    let list = todos;

    switch (filterStatus) {
      case FilterStatus.Active:
        list = todos.filter(t => !t.completed);
        break;
      case FilterStatus.Completed:
        list = todos.filter(t => t.completed);
        break;
      default:
        break;
    }

    if (isAdding && filterStatus !== FilterStatus.Completed) {
      const trimmed = newTitle.trim();
      const temp: Todo = {
        id: TEMP_TODO_ID,
        userId: USER_ID,
        title: trimmed,
        completed: false,
      };

      list = [temp, ...list.filter(t => t.id !== TEMP_TODO_ID)];
    }

    return list;
  }, [todos, filterStatus, isAdding, newTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = newTitle.trim();

    if (!trimmed) {
      setErrorMessage(ErrorText.Empty);

      return;
    }

    setIsAdding(true);
    setLoadingTodoIds(prev => [...prev, TEMP_TODO_ID]);

    const tempTodo: Todo = {
      id: TEMP_TODO_ID,
      userId: USER_ID,
      title: trimmed,
      completed: false,
    };

    setTodos(prev => [...prev, tempTodo]);

    createTodo(trimmed)
      .then(created => {
        setTodos(prev =>
          prev.filter(t => t.id !== TEMP_TODO_ID).concat(created),
        );
        setNewTitle('');
      })
      .catch(() => {
        setErrorMessage(ErrorText.Add);
        setTodos(prev => prev.filter(t => t.id !== TEMP_TODO_ID));
      })
      .finally(() => {
        setIsAdding(false);
        setLoadingTodoIds(prev => prev.filter(id => id !== TEMP_TODO_ID));
      });
  };

  const handleDelete = (todoId: number) => {
    setErrorMessage('');
    setLoadingTodoIds(prev => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() => setTodos(prev => prev.filter(t => t.id !== todoId)))
      .catch(() => setErrorMessage(ErrorText.Delete))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  const handleToggle = (todo: Todo) => {
    setErrorMessage('');
    const id = todo.id;

    setLoadingTodoIds(prev => [...prev, id]);
    const patched: Todo = { ...todo, completed: !todo.completed };

    updateTodo(patched)
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      })
      .catch(() => setErrorMessage(ErrorText.Update))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(x => x !== id));
      });
  };

  const handleRename = (id: number, newTitleValue: string) => {
    setErrorMessage('');
    setLoadingTodoIds(prev => [...prev, id]);

    const current = todos.find(t => t.id === id);

    if (!current) {
      setLoadingTodoIds(prev => prev.filter(x => x !== id));

      return;
    }

    updateTodo({ ...current, title: newTitleValue })
      .then(updated => {
        setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
      })
      .catch(() => setErrorMessage(ErrorText.Update))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(x => x !== id));
      });
  };

  const activeTodosCount = todos.filter(t => !t.completed).length;
  const allCompleted = todos.length > 0 && activeTodosCount === 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          showToggle={!!todos.length}
          allCompleted={allCompleted}
          newTitle={newTitle}
          isAdding={isAdding}
          onChangeTitle={setNewTitle}
          onSubmit={handleSubmit}
          inputRef={newTodoFieldRef}
        />

        {(!!todos.length || isLoading) && (
          <section className="todoapp__main" data-cy="TodoList">
            {isLoading && (
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            )}

            {visibleTodos.map(todo => {
              const isRowLoading =
                loadingTodoIds.includes(todo.id) || todo.id === TEMP_TODO_ID;

              return (
                <TodoItem
                  key={todo.id === TEMP_TODO_ID ? 'temp' : todo.id}
                  todo={todo}
                  isLoading={isRowLoading}
                  onToggle={() => handleToggle(todo)}
                  onDelete={() => handleDelete(todo.id)}
                  onRename={handleRename}
                />
              );
            })}
          </section>
        )}

        <Footer
          countActive={activeTodosCount}
          todosLength={todos.length}
          current={filterStatus}
          setFilter={setFilterStatus}
          hasCompleted={todos.some(t => t.completed)}
        />
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMessage ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
