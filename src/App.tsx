/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem';
import { FilterType, ErrorMessage } from './types/Enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const todoFieldRef = useRef<HTMLInputElement>(null);

  const showError = (message: ErrorMessage) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(ErrorMessage.None), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => showError(ErrorMessage.Load));
  }, []);

  useEffect(() => {
    if (!isAdding && todoFieldRef.current) {
      todoFieldRef.current.focus();
    }
  }, [isAdding, todos.length]);

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = newTodoTitle.trim();

    if (!trimmedTitle) {
      showError(ErrorMessage.EmptyTitle);

      return;
    }

    setIsAdding(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
      length: undefined,
    });

    createTodo(trimmedTitle)
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setNewTodoTitle('');
      })
      .catch(() => showError(ErrorMessage.Add))
      .finally(() => {
        setIsAdding(false);
        setTempTodo(null);
        todoFieldRef.current?.focus();
      });
  };

  const handleDeleteTodo = (id: number) => {
    setLoadingTodoIds(prev => [...prev, id]);
    deleteTodo(id)
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)))
      .catch(() => showError(ErrorMessage.Delete))
      // eslint-disable-next-line prettier/prettier
      .finally(() => setLoadingTodoIds(prev => prev.filter(curr => curr !== id)));
  };

  const handleUpdateTodo = (todo: Todo, data: Partial<Todo>) => {
    setLoadingTodoIds(prev => [...prev, todo.id]);
    updateTodo(todo.id, data)
      .then(updated =>
        setTodos(prev => prev.map(t => (t.id === todo.id ? updated : t))),
      )
      .catch(() => showError(ErrorMessage.Update))
      .finally(() =>
        setLoadingTodoIds(prev => prev.filter(id => id !== todo.id)),
      );
  };

  const visibleTodos = useMemo(
    () =>
      todos.filter(t => {
        if (filter === FilterType.Active) {
          return !t.completed;
        }

        if (filter === FilterType.Completed) {
          return t.completed;
        }

        return true;
      }),
    [todos, filter],
  );

  const activeCount = todos.filter(t => !t.completed).length;

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
              className={cn('todoapp__toggle-all', {
                active: todos.every(t => t.completed),
              })}
              onClick={() => {
                const allDone = todos.every(t => t.completed);

                todos
                  .filter(t => t.completed === allDone)
                  .forEach(t => handleUpdateTodo(t, { completed: !allDone }));
              }}
            />
          )}
          <form onSubmit={handleAddTodo}>
            <input
              ref={todoFieldRef}
              type="text"
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              disabled={isAdding}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isDeleting={loadingTodoIds.includes(todo.id)}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          ))}
          {tempTodo && (
            <div className="todo" data-cy="Todo">
              <label className="todo__status-label">
                <input type="checkbox" className="todo__status" />
              </label>
              <span className="todo__title" data-cy="TodoTitle">
                {tempTodo.title}
              </span>
              <div data-cy="TodoLoader" className="modal overlay is-active">
                <div className="loader" />
              </div>
            </div>
          )}
        </section>

        {(todos.length > 0 || tempTodo) && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeCount} items left
            </span>
            <nav className="filter" data-cy="Filter">
              {Object.values(FilterType).map(t => (
                <a
                  key={t}
                  data-cy={`FilterLink${t[0].toUpperCase() + t.slice(1)}`}
                  href={`#/${t === FilterType.All ? '' : t}`}
                  className={cn('filter__link', { selected: filter === t })}
                  onClick={() => setFilter(t)}
                >
                  {t[0].toUpperCase() + t.slice(1)}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!todos.some(t => t.completed)}
              onClick={() =>
                todos
                  .filter(t => t.completed)
                  .forEach(t => handleDeleteTodo(t.id))
              }
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={cn('notification is-danger is-light', {
          hidden: !errorMessage,
        })}
      >
        <button
          type="button"
          data-cy="HideErrorButton"
          className="delete"
          onClick={() => setErrorMessage(ErrorMessage.None)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
