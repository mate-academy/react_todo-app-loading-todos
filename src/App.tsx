/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoTools from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  // #region state - Hooks MUST come first
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number>(0);
  const [editTitle, setEditTitle] = useState('');
  // #endregion

  // #region useEffect
  useEffect(() => {
    todoTools
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
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
  // #endregion

  // Move the early return HERE, after all Hooks
  if (!todoTools.USER_ID) {
    return <UserWarning />;
  }

  // #region handlers
  const handleDelete = (todoId: number) => {
    setLoadingTodoIds(prev => [...prev, todoId]);
    setError('');

    todoTools
      .deleteTodo(todoId)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  const updateTitle = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);
    const trimmedTitle = editTitle.trim();

    if (todo && trimmedTitle === todo.title) {
      setEditingTodoId(0);
      return;
    }

    if (!trimmedTitle) {
      handleDelete(todoId);
      return;
    }

    setLoadingTodoIds(prev => [...prev, todoId]);

    todoTools
      .updateTodo(todoId, { title: trimmedTitle })
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === todoId ? updatedTodo : t)));
        setEditingTodoId(0);
      })
      .catch(() => setError('Unable to update a todo'))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  const clearCompleted = () => {
    todos.filter(todo => todo.completed).forEach(todo => handleDelete(todo.id));
  };

  const toggleTodo = (todo: Todo) => {
    setLoadingTodoIds(prev => [...prev, todo.id]);
    setError('');

    todoTools
      .updateTodo(todo.id, { completed: !todo.completed })
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
      })
      .catch(() => setError('Unable to update a todo'))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
      });
  };

  const toggleAll = () => {
    const targetStatus = !todos.every(t => t.completed);
    const toUpdate = todos.filter(todo => todo.completed !== targetStatus);

    toUpdate.forEach(todo => {
      setLoadingTodoIds(prev => [...prev, todo.id]);
      todoTools.updateTodo(todo.id, { completed: targetStatus })
        .then(updatedTodo => {
          setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
        })
        .catch(() => setError('Unable to update a todo'))
        .finally(() => {
          setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
        });
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError('Title should not be empty');
      return;
    }

    setIsLoading(true);
    setError('');
    setTempTodo({
      id: 0,
      userId: todoTools.USER_ID,
      title: trimmedQuery,
      completed: false,
    });

    todoTools.createTodo({
      userId: todoTools.USER_ID,
      title: trimmedQuery,
      completed: false,
    })
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setQuery('');
      })
      .catch(() => setError('Unable to add a todo'))
      .finally(() => {
        setIsLoading(false);
        setTempTodo(null);
      });
  };
  // #endregion

  const calcTodos = todos.filter(todo => !todo.completed).length;
  const visibleTodos = todos.filter(t => {
    if (filterStatus === 'active') return !t.completed;
    if (filterStatus === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(t => t.completed),
            })}
            data-cy="ToggleAllButton"
            disabled={isLoading}
            onClick={toggleAll}
          />
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={classNames('todo', {
                    completed: todo.completed,
                    editing: editingTodoId === todo.id,
                  })}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo)}
                    />
                  </label>

                  {editingTodoId === todo.id ? (
                    <form onSubmit={e => { e.preventDefault(); updateTitle(todo.id); }}>
                      <input
                        data-cy="TodoTitleField"
                        type="text"
                        className="todo__title-field"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onBlur={() => updateTitle(todo.id)}
                        onKeyUp={e => e.key === 'Escape' && setEditingTodoId(0)}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <span
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => {
                        setEditingTodoId(todo.id);
                        setEditTitle(todo.title);
                      }}
                    >
                      {todo.title}
                    </span>
                  )}

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    ×
                  </button>

                  <div
                    data-cy="TodoLoader"
                    className={classNames('modal overlay', {
                      'is-active': loadingTodoIds.includes(todo.id),
                    })}
                  >
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}

              {tempTodo && (
                <div data-cy="Todo" className="todo">
                  <label className="todo__status-label">
                    <input type="checkbox" className="todo__status" />
                  </label>
                  <span className="todo__title">{tempTodo.title}</span>
                  <button type="button" className="todo__remove">×</button>
                  <div className="modal overlay is-active">
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              )}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {calcTodos} items left
              </span>
              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={classNames('filter__link', { selected: filterStatus === 'all' })}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </a>
                <a
                  href="#/active"
                  className={classNames('filter__link', { selected: filterStatus === 'active' })}
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </a>
                <a
                  href="#/completed"
                  className={classNames('filter__link', { selected: filterStatus === 'completed' })}
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </a>
              </nav>
              <button
                type="button"
                className="todoapp__clear-completed"
                disabled={!todos.some(t => t.completed)}
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
