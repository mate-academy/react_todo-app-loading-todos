/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { deleteTodo, getTodos, patchTodo, postTodo } from './api/todos';
import { Todo } from './types/Todo';
import { Footer } from './Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const editSelectedInput = useRef<HTMLInputElement>(null);
  const isAnyCompleted = todos.some(todo => todo.completed);

  const resetErr = () =>
    setTimeout(() => {
      setErrMessage('');
    }, 3000);

  useEffect(() => {
    if (isEdited && editSelectedInput.current) {
      editSelectedInput.current.focus();
    }
  }, [isEdited]);

  useEffect(() => {
    const loadTodos = async () => {
      getTodos()
        .then(setTodos)
        .catch(() => {
          setErrMessage('Unable to load todos');
          resetErr();
        });
    };

    loadTodos();
  }, []);

  const updateTodo = async (updatedTodo: Todo, option: keyof Todo) => {
    try {
      setIsLoading(updatedTodo.id);
      const todoToUpdate = todos.find(tod => tod.id === updatedTodo.id);

      let newTodo: Todo = {
        id: 0,
        userId: 0,
        title: '',
        completed: false,
      };

      if (option === 'completed' && todoToUpdate) {
        newTodo = { ...todoToUpdate, completed: !updatedTodo.completed };
      }

      if (option === 'title' && todoToUpdate) {
        newTodo = { ...todoToUpdate, title: editedTitle };
      }

      await patchTodo(newTodo);

      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id === updatedTodo.id) {
            return { ...todo, ...newTodo };
          }

          return todo;
        });
      });
    } catch {
      setErrMessage('Unable to update a todo');
      resetErr();
    } finally {
      setIsLoading(null);
    }
  };

  const addTodo = async () => {
    const newTodo: Todo = {
      id: 0,
      userId: 472,
      title: newTitle,
      completed: false,
    };

    try {
      setIsLoading(0);

      await postTodo(newTodo);

      setTodos(prevTodos => [...prevTodos, newTodo]);
      console.info('success!!!, todo added');
    } catch (error) {
      setErrMessage('Unable to add a todo');
      resetErr();
    } finally {
      setIsLoading(null);
      setNewTitle('');
    }
  };

  const removeTodo = async (todoToRmove: Todo) => {
    try {
      setIsLoading(todoToRmove.id);

      await deleteTodo(todoToRmove.id);

      setTodos(prevTodos => {
        return prevTodos.filter(todo => todo.id !== todoToRmove.id);
      });
      console.info('success!!!, todo deleted');
    } catch {
      setErrMessage('Unable to delete a todo');
      resetErr();
    } finally {
      setIsLoading(null);
    }
  };

  const handleEditedTitle = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      updateTodo(todo, 'title');
      setIsEdited(null);
    }
  };

  const handleRemoveButton = (
    todo: Todo,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    removeTodo(todo);
  };

  const handleSubmit = () => {
    if (newTitle === '') {
      setErrMessage('Title should not be empty');
      resetErr();

      return;
    }

    addTodo();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={cn('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo, 'completed')}
                />
              </label>

              {!isEdited && (
                <>
                  <span
                    data-cy="TodoTitle"
                    onDoubleClick={() => setIsEdited(todo.id)}
                    className="todo__title"
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={event => handleRemoveButton(todo, event)}
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                </>
              )}

              {isEdited === todo.id && (
                <form>
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    placeholder={todo.title}
                    value={editedTitle}
                    onChange={event => setEditedTitle(event.target.value)}
                    onKeyUp={event => handleEditedTitle(event, todo)}
                    ref={editSelectedInput}
                  />
                </form>
              )}

              <div
                data-cy="TodoLoader"
                className={cn('modal overlay', {
                  'is-active': isLoading === todo.id,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        <Footer todos={todos} isAnyCompleted={isAnyCompleted} />
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrMessage('')}
        />
        {errMessage}
      </div>
    </div>
  );
};
