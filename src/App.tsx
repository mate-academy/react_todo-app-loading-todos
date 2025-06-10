/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { USER_ID, getTodos, uppTodos, deleteTodo, addTodo } from './api/todos';

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [loadingTodos, setLoadingTodos] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  // Auto-hide error after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  const hideError = () => {
    setErrorMessage('');
  };

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = newTodoTitle.trim();

    if (!title) {
      showError('Title should not be empty');

      return;
    }

    const newTodoData = {
      userId: USER_ID,
      title,
      completed: false,
    };

    setIsAdding(true);
    try {
      const newTodo = await addTodo(newTodoData);

      setTodos(prev => [...prev, newTodo]);
      setNewTodoTitle('');
    } catch (error) {
      showError('Unable to add a todo');
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoadingTodos(prev => [...prev, id]);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    const updated = { ...todo, completed: !todo.completed };

    try {
      await uppTodos(id, updated);
      setTodos(todos.map(t => (t.id === id ? updated : t)));
    } catch (error) {
      showError('Unable to update a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(tid => tid !== id));
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingTodos(prev => [...prev, id]);
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      showError('Unable to delete a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(tid => tid !== id));
    }
  };

  const handleEditTitleChange = (id: number, newTitle: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const handleSaveEdit = async (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    if (todo.title.trim() === '') {
      await handleDelete(id);

      return;
    }

    setLoadingTodos(prev => [...prev, id]);
    try {
      await uppTodos(id, todo);
      setEditingTodoId(null);
    } catch (error) {
      showError('Unable to update a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(tid => tid !== id));
    }
  };

  const handleEditCancel = (id: number) => {
    // Restaura o título original
    const originalTodo = todos.find(t => t.id === id);

    if (originalTodo) {
      setTodos(prevTodos =>
        prevTodos.map(t => (t.id === id ? originalTodo : t)),
      );
    }

    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter(t => t.completed);
    const completedIds = completedTodos.map(t => t.id);

    if (completedIds.length === 0) {
      return;
    }

    setLoadingTodos(prev => [...prev, ...completedIds]);

    try {
      await Promise.all(completedIds.map(id => deleteTodo(id)));
      setTodos(todos.filter(t => !t.completed));
    } catch (error) {
      showError('Unable to delete a todo');
    } finally {
      setLoadingTodos(prev => prev.filter(id => !completedIds.includes(id)));
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form onSubmit={handleAddTodo}>
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

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => {
            const isEditing = editingTodoId === todo.id;
            const isLoading = loadingTodos.includes(todo.id);
            const todoClass = `todo${todo.completed ? ' completed' : ''}`;

            return (
              <div
                data-cy="Todo"
                className={`${todoClass}${isLoading ? ' loading' : ''}`}
                key={todo.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    disabled={isLoading}
                  />
                </label>

                {isEditing ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSaveEdit(todo.id);
                    }}
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={todo.title}
                      onChange={e =>
                        handleEditTitleChange(todo.id, e.target.value)
                      }
                      onBlur={() => handleSaveEdit(todo.id)}
                      onKeyDown={e => {
                        if (e.key === 'Escape') {
                          handleEditCancel(todo.id);
                        }
                      }}
                      autoFocus
                    />
                  </form>
                ) : (
                  <>
                    <span
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => setEditingTodoId(todo.id)}
                    >
                      {todo.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleDelete(todo.id)}
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </>
                )}

                <div
                  data-cy="TodoLoader"
                  className={`modal overlay${isLoading ? ' is-active' : ''}`}
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

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
                onClick={e => {
                  e.preventDefault();
                  setFilter('all');
                }}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={e => {
                  e.preventDefault();
                  setFilter('active');
                }}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={e => {
                  e.preventDefault();
                  setFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosCount === 0}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal${
          errorMessage ? '' : ' hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
