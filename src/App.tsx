/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  // Стейти для редагування
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const editFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        showError('Unable to load todos');
      });
  }, []);

  // Фокусуємось на інпуті при вході в режим редагування
  useEffect(() => {
    if (editingTodo && editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, [editingTodo]);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      showError('Title should not be empty');

      return;
    }

    setIsAdding(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: newTodoTitle,
      completed: false,
      length: undefined,
    });

    createTodo(newTodoTitle)
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setNewTodoTitle('');
      })
      .catch(() => showError('Unable to add a todo'))
      .finally(() => {
        setIsAdding(false);
        setTempTodo(null);
      });
  };

  const handleDelete = (todoId: number) => {
    setLoadingTodoIds(prev => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      })
      .catch(() => showError('Unable to delete a todo'))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  const handleUpdateTodo = (todo: Todo, data: Partial<Todo>) => {
    // Якщо дані не змінилися, просто виходимо
    if (data.title !== undefined && data.title.trim() === todo.title) {
      setEditingTodo(null);

      return;
    }

    // Якщо назву стерли повністю — видаляємо справу
    if (data.title !== undefined && !data.title.trim()) {
      handleDelete(todo.id);
      setEditingTodo(null);

      return;
    }

    setLoadingTodoIds(prev => [...prev, todo.id]);

    updateTodo(todo.id, data)
      .then(updatedTodo => {
        setTodos(prev => prev.map(t => (t.id === todo.id ? updatedTodo : t)));
        setEditingTodo(null);
      })
      .catch(() => showError('Unable to update a todo'))
      .finally(() => {
        setLoadingTodoIds(prev => prev.filter(id => id !== todo.id));
      });
  };

  const toggleAll = () => {
    const isAllCompleted = todos.every(t => t.completed);
    const todosToUpdate = todos.filter(t => t.completed === isAllCompleted);

    todosToUpdate.forEach(todo =>
      handleUpdateTodo(todo, { completed: !isAllCompleted }),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);
  const isAllDone = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${isAllDone ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              disabled={isAdding}
            />
          </form>
        </header>

        {(todos.length > 0 || tempTodo) && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
                key={todo.id}
              >
                <label
                  className="todo__status-label"
                  htmlFor={`status-${todo.id}`}
                >
                  <input
                    id={`status-${todo.id}`}
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() =>
                      handleUpdateTodo(todo, { completed: !todo.completed })
                    }
                  />
                </label>

                {editingTodo?.id === todo.id ? (
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      handleUpdateTodo(todo, { title: editTitle });
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      value={editTitle}
                      ref={editFieldRef}
                      onChange={event => setEditTitle(event.target.value)}
                      onBlur={() =>
                        handleUpdateTodo(todo, { title: editTitle })
                      }
                      onKeyUp={event =>
                        event.key === 'Escape' && setEditingTodo(null)
                      }
                    />
                  </form>
                ) : (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      setEditingTodo(todo);
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
                  className={`modal overlay ${loadingTodoIds.includes(todo.id) ? 'is-active' : ''}`}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}

            {tempTodo && (
              <div data-cy="Todo" className="todo">
                <label className="todo__status-label" htmlFor="temp-status">
                  <input
                    id="temp-status"
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                  />
                </label>
                <span data-cy="TodoTitle" className="todo__title">
                  {tempTodo.title}
                </span>
                <button type="button" className="todo__remove">
                  ×
                </button>
                <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            )}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              style={{ visibility: hasCompleted ? 'visible' : 'hidden' }}
              onClick={() =>
                todos.filter(t => t.completed).forEach(t => handleDelete(t.id))
              }
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
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
