/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [value, setValue] = useState<string>('');
  const [selectedLink, setSelectedLink] = useState<string>('all');
  const [savingId, setSavingID] = useState<number | null>(null);

  const [isLoadError, setIsLoadError] = useState<boolean>(false);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isAddError, setIsAddError] = useState<boolean>(false);
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false);
  const [isUpdateError, setIsUpdateError] = useState<boolean>(false);
  const [titleForEditing, setTitleForEditing] = useState<string>('');

  const titleField = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const serverTodosCount = useRef<number>(0);
  const isError =
    isAddError || isDeleteError || isLoadError || isTitleError || isUpdateError;
  const links = ['All', 'Active', 'Completed'];

  function hideError(setError: React.Dispatch<React.SetStateAction<boolean>>) {
    setTimeout(() => setError(false), 3000);
  }

  useEffect(() => {
    if (editingId !== null) {
      const editingTodo = todos.find(todo => todo.id === editingId);

      if (editingTodo) {
        setTitleForEditing(editingTodo.title);
      }

      setTimeout(() => {
        editInputRef.current?.focus();
      }, 0);
    }
  }, [editingId, todos]);

  useEffect(() => {
    setIsLoading(true);

    if (titleField.current) {
      titleField.current.focus();
    }

    getTodos()
      .catch(() => {
        setIsLoadError(true);
        hideError(setIsLoadError);

        throw new Error();
      })
      .then(result => {
        if (selectedLink === 'completed') {
          setTodos(result.filter(x => x.completed === true));
        } else if (selectedLink === 'active') {
          setTodos(result.filter(x => x.completed === false));
        } else {
          setTodos(result);
        }

        serverTodosCount.current = result.length;
      })
      .finally(() => setIsLoading(false));
  }, [selectedLink]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

    e.preventDefault();
    setIsLoading(true);
    setSavingID(maxId);

    if (
      value.length === 0 ||
      value.split('').filter(x => x !== ' ').length === 0
    ) {
      setIsTitleError(true);
      hideError(setIsTitleError);

      return;
    }

    const data = {
      title: value,
      userId: USER_ID,
      completed: false,
      id: maxId,
    };

    postTodo(data)
      .then((newTodo: Todo) => {
        setTodos([...todos, newTodo]);
        setSavingID(newTodo.id);
      })
      .catch(() => {
        setIsAddError(true);
        hideError(setIsAddError);
      })
      .finally(() => {
        setIsLoading(false);
        setValue('');
        setSavingID(null);
      });
  }

  function handleDelete(todoId: number) {
    setSavingID(todoId);
    setIsLoading(true);

    deleteTodo(todoId)
      .catch(() => {
        setIsDeleteError(true);
        hideError(setIsDeleteError);

        return;
      })
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.filter(todo => todo.id !== todoId),
        );
      })
      .finally(() => {
        setSavingID(null);
        setIsLoading(false);
      });
  }

  function deleteAllCompleted() {
    setIsLoading(true);

    const completed = todos.filter(todo => todo.completed);
    const deletePromises = completed.map(todo => deleteTodo(todo.id));

    Promise.all(deletePromises)
      .catch(() => {
        setIsDeleteError(true);
        hideError(setIsDeleteError);

        return;
      })
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateTodo(updatedTodo: Todo) {
    const trimmedTitle = titleForEditing.trim();

    if (!trimmedTitle) {
      setIsUpdateError(true);
      hideError(setIsUpdateError);
      setEditingId(null);

      return;
    }

    setIsLoading(true);
    setSavingID(updatedTodo.id);

    updateTodo(updatedTodo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo =>
            todo.id === updatedTodo.id
              ? { ...todo, title: trimmedTitle }
              : todo,
          ),
        );
      })
      .catch(() => {
        setIsUpdateError(true);
        hideError(setIsUpdateError);
      })
      .finally(() => {
        setEditingId(null);
        setTitleForEditing('');
        setIsLoading(false);
        setSavingID(null);
      });
  }

  function handleInputDoubleClick(elem: Todo) {
    setEditingId(elem.id);
    setTitleForEditing(elem.title);
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: !todos.find(x => x.completed === false),
            })}
            data-cy="ToggleAllButton"
          />

          <form onSubmit={e => handleSubmit(e)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={e => setValue(e.target.value)}
              ref={titleField}
              disabled={isLoading}
            />
          </form>
        </header>

        {serverTodosCount.current > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {todos.map(todo => (
              <div
                data-cy="Todo"
                className={classNames('todo', { completed: todo.completed })}
                key={todo.id}
                onDoubleClick={() => handleInputDoubleClick(todo)}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                </label>

                {editingId === todo.id && editingId ? (
                  <form
                    onSubmit={() =>
                      handleUpdateTodo({ ...todo, title: titleForEditing })
                    }
                  >
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={titleForEditing}
                      onChange={e => {
                        setTitleForEditing(e.target.value);
                      }}
                      ref={editInputRef}
                    />
                  </form>
                ) : (
                  <>
                    <span data-cy="TodoTitle" className="todo__title">
                      {todo.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      ×
                    </button>
                  </>
                )}

                <div
                  className={classNames('modal overlay', {
                    'is-active': savingId === todo.id,
                  })}
                  data-cy="TodoLoader"
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}
          </section>
        )}

        {serverTodosCount.current > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(x => x.completed === false).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {links.map(link => (
                <a
                  href={`#/${link.toLowerCase()}`}
                  className={classNames('filter__link', {
                    selected: selectedLink === link.toLowerCase(),
                  })}
                  data-cy={`FilterLink${link}`}
                  key={link}
                  onClick={() => {
                    setSelectedLink(link.toLowerCase());
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={
                todos.filter(todo => todo.completed === true).length === 0
              }
              onClick={() => deleteAllCompleted()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !isError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={e => {
            const parent = (e.target as HTMLButtonElement).parentElement;

            if (parent) {
              parent.classList.add('hidden');
            }
          }}
        />
        {isLoadError
          ? 'Unable to load todos'
          : isTitleError
            ? 'Title should not be empty'
            : isAddError
              ? 'Unable to add a todo'
              : isDeleteError
                ? 'Unable to delete a todo'
                : isUpdateError
                  ? 'Unable to update a todo'
                  : ''}
      </div>
    </div>
  );
};
