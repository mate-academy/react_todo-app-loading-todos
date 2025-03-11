/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import {
  deleteTodos,
  getTodos,
  patchTodos,
  postTodos,
  USER_ID,
} from './api/todos';
import { Loader } from './utils/loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMsg('Unable to load todos');
        setTimeout(() => setErrorMsg(null), 3000);
      })
      .finally(() => setLoading(false));
  }, []);

  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingTodo !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const newCompletedState = !areAllCompleted;
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: newCompletedState,
    }));

    setTodos(updatedTodos);
    updatedTodos.forEach(todo => {
      patchTodos(todo.id, { completed: newCompletedState }).catch(() =>
        setErrorMsg('Unable to update todos'),
      );
    });
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodoTitle.trim()) {
      setErrorMsg('Title should not be empty');

      return;
    }

    const newTodo = { title: newTodoTitle, completed: false };

    setErrorMsg(null);
    setLoading(true);

    postTodos(newTodo)
      .then(createdTodo => setTodos([...todos, createdTodo]))
      .catch(() => {
        setErrorMsg('Unable to add todos');
        setTimeout(() => setErrorMsg(null), 3000);
      })
      .finally(() => {
        setLoading(false);
        setNewTodoTitle('');
      });
  };

  const handleToggleComplete = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };

    patchTodos(todo.id, updatedTodo)
      .then(() =>
        setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t))),
      )
      .catch(() => {
        setErrorMsg('Unable to update todos');
        setTimeout(() => setErrorMsg(null), 3000);
      });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodos(id)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(() => {
        setErrorMsg('Unable to delete todos');
        setTimeout(() => setErrorMsg(null), 3000);
      });
  };

  const handleEditTodo = (id: number, title: string) => {
    setEditingTodo(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = (todo: Todo) => {
    if (!editingTitle.trim()) {
      handleDeleteTodo(todo.id);

      return;
    }

    const updatedTodo = { ...todo, title: editingTitle };

    patchTodos(todo.id, updatedTodo)
      .then(() => {
        setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
        setEditingTodo(null);
      })
      .catch(() => {
        setErrorMsg('Unable to update todos');
        setTimeout(() => setErrorMsg(null), 3000);
      });
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

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.all(completedTodos.map(todo => deleteTodos(todo.id)))
      .then(() => setTodos(todos.filter(todo => !todo.completed)))
      .catch(() => {
        setErrorMsg('Unable to delete completed todos');
        setTimeout(() => setErrorMsg(null), 3000);
      });
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleAddTodo}>
            <input
              ref={editInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
          </form>
        </header>

        {loading && <Loader />}

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                />
              </label>

              {editingTodo === todo.id ? (
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    handleSaveEdit(todo);
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    onBlur={() => handleSaveEdit(todo)}
                  />
                </form>
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEditTodo(todo.id, todo.title)}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              )}

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'}{' '}
              left
            </span>

            {/* Active link should have the 'selected' class */}
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

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          errorMsg ? '' : 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMsg(null)}
        />
        {errorMsg}
      </div>
    </div>
  );
};
