/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

type Filter = (typeof FILTERS)[keyof typeof FILTERS];

type NewTodoFormProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  onAdd: () => void;
};

const NewTodoForm: React.FC<NewTodoFormProps> = ({ inputRef, onAdd }) => (
  <form>
    <input
      data-cy="NewTodoField"
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      autoFocus
      ref={inputRef}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onAdd();
        }
      }}
    />
  </form>
);

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  editValue: string;
  editInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number, title: string) => void;
  onEditChange: (value: string) => void;
  onRename: (id: number, currentTitle: string) => void;
  onCancelEdit: () => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  editValue,
  editInputRef,
  isLoading,
  onToggle,
  onDelete,
  onStartEdit,
  onEditChange,
  onRename,
  onCancelEdit,
}) => (
  <div
    data-cy="Todo"
    className={classNames('todo', { completed: todo.completed })}
  >
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />
    </label>

    {isEditing ? (
      <form
        onSubmit={event => {
          event.preventDefault();
          onRename(todo.id, todo.title);
        }}
      >
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          ref={editInputRef}
          value={editValue}
          onChange={event => onEditChange(event.target.value)}
          onBlur={() => onRename(todo.id, todo.title)}
          onKeyDown={event => {
            if (event.key === 'Escape') {
              onCancelEdit();
            }
          }}
        />
      </form>
    ) : (
      <>
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => onStartEdit(todo.id, todo.title)}
        >
          {todo.title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      </>
    )}

    <div
      data-cy="TodoLoader"
      className={classNames('modal overlay', {
        'is-active': isLoading,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);

type TodoListProps = {
  todos: Todo[];
  editingId: number | null;
  editValue: string;
  editInputRef: React.RefObject<HTMLInputElement>;
  loadingId: number | null;
  loadingIds: number[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number, title: string) => void;
  onEditChange: (value: string) => void;
  onRename: (id: number, currentTitle: string) => void;
  onCancelEdit: () => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  editingId,
  editValue,
  editInputRef,
  loadingId,
  loadingIds,
  onToggle,
  onDelete,
  onStartEdit,
  onEditChange,
  onRename,
  onCancelEdit,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isEditing={editingId === todo.id}
        editValue={editValue}
        editInputRef={editInputRef}
        isLoading={loadingId === todo.id || loadingIds.includes(todo.id)}
        onToggle={onToggle}
        onDelete={onDelete}
        onStartEdit={onStartEdit}
        onEditChange={onEditChange}
        onRename={onRename}
        onCancelEdit={onCancelEdit}
      />
    ))}
  </section>
);

type TodoFooterProps = {
  activeTodosCount: number;
  filter: Filter;
  onFilterChange: (filterValue: Filter) => void;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

const TodoFooter: React.FC<TodoFooterProps> = ({
  activeTodosCount,
  filter,
  onFilterChange,
  hasCompleted,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FILTERS.all,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterChange(FILTERS.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FILTERS.active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterChange(FILTERS.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FILTERS.completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterChange(FILTERS.completed)}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompleted}
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState<Filter>(FILTERS.all);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const nextTempId = useRef(-1);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timer = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'));

    inputRef.current?.focus();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const hasTodos = todos.length > 0;
  const hasCompleted = todos.some(todo => todo.completed);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const areAllCompleted = hasTodos && todos.every(todo => todo.completed);

  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS.active) {
      return !todo.completed;
    }

    if (filter === FILTERS.completed) {
      return todo.completed;
    }

    return true;
  });

  const addTodo = async () => {
    setErrorMessage('');

    const value = inputRef.current?.value.trim();

    if (!value) {
      setErrorMessage('Title should not be empty');
      inputRef.current?.focus();

      return;
    }

    const tempId = nextTempId.current;

    nextTempId.current -= 1;

    const tempTodo: Todo = {
      id: tempId,
      userId: USER_ID,
      title: value,
      completed: false,
    };

    const newTodo: Omit<Todo, 'id'> = {
      userId: USER_ID,
      title: value,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, tempTodo]);
    setLoadingId(tempId);

    try {
      const savedTodo = await client.post<Todo>('/todos', newTodo);

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === tempId ? savedTodo : todo)),
      );

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (error) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== tempId));
      setErrorMessage('Unable to add a todo');
      throw error;
    } finally {
      setLoadingId(null);
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    setErrorMessage('');
    setLoadingId(id);

    try {
      const updatedTodo = await client.patch<Todo>(`/todos/${id}`, {
        completed: !completed,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      throw error;
    } finally {
      setLoadingId(null);
    }
  };

  const removeTodo = async (id: number) => {
    setErrorMessage('');
    setLoadingId(id);

    try {
      await client.delete(`/todos/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoadingId(null);
    }
  };

  const renameTodo = async (id: number, currentTitle: string) => {
    setErrorMessage('');

    const trimmedTitle = editValue.trim();

    if (trimmedTitle === currentTitle) {
      setEditingId(null);

      return;
    }

    if (!trimmedTitle) {
      await removeTodo(id);
      setEditingId(null);

      return;
    }

    setLoadingId(id);

    try {
      const updatedTodo = await client.patch<Todo>(`/todos/${id}`, {
        title: trimmedTitle,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? updatedTodo : todo)),
      );
      setEditingId(null);
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      editInputRef.current?.focus();
      throw error;
    } finally {
      setLoadingId(null);
    }
  };

  const clearCompleted = async () => {
    setErrorMessage('');

    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    setLoadingIds(completedIds);

    try {
      await Promise.all(completedIds.map(id => client.delete(`/todos/${id}`)));
      setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const toggleAll = async () => {
    if (!hasTodos) {
      return;
    }

    setErrorMessage('');

    const todosToUpdate = areAllCompleted
      ? todos
      : todos.filter(todo => !todo.completed);

    setLoadingIds(todosToUpdate.map(todo => todo.id));

    try {
      const updatedTodos = await Promise.all(
        todosToUpdate.map(todo =>
          client.patch<Todo>(`/todos/${todo.id}`, {
            completed: !areAllCompleted,
          }),
        ),
      );

      setTodos(prevTodos =>
        prevTodos.map(
          todo => updatedTodos.find(updated => updated.id === todo.id) ?? todo,
        ),
      );
    } catch (error) {
      setErrorMessage('Unable to update todos');
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditValue(title);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: areAllCompleted,
              hidden: !hasTodos,
            })}
            data-cy="ToggleAllButton"
            onClick={toggleAll}
            disabled={!hasTodos}
          />

          <NewTodoForm inputRef={inputRef} onAdd={addTodo} />
        </header>

        {hasTodos && (
          <>
            <TodoList
              todos={filteredTodos}
              editingId={editingId}
              editValue={editValue}
              editInputRef={editInputRef}
              loadingId={loadingId}
              loadingIds={loadingIds}
              onToggle={toggleTodo}
              onDelete={removeTodo}
              onStartEdit={startEditing}
              onEditChange={setEditValue}
              onRename={renameTodo}
              onCancelEdit={() => setEditingId(null)}
            />

            <TodoFooter
              activeTodosCount={activeTodosCount}
              filter={filter}
              onFilterChange={setFilter}
              hasCompleted={hasCompleted}
              onClearCompleted={clearCompleted}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
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
