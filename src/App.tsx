import React, { useEffect, useRef, useState } from 'react';
import { get } from './api/todos';
import { TodoList } from './components/todoList/todoList';
import { TodoInterface } from './types/Todo';
import { FilteredTodoList } from './components/footer/filteredTodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [fiter, setFilter] = useState('all');

  const [errorMessage, setErrorMessage] = useState('');

  const inputForFocusRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  function errorHandling(error: Error) {
    if (notificationRef.current) {
      notificationRef.current.classList.remove('hidden');
      setErrorMessage(error.message);
      setTimeout(() => {
        if (notificationRef.current) {
          notificationRef.current.classList.add('hidden');
        }
      }, 3000);
    }
  }

  useEffect(() => {
    if (inputForFocusRef.current) {
      inputForFocusRef.current.focus();
    }

    const fetchTodos = async () => {
      try {
        if (notificationRef.current) {
          notificationRef.current.classList.add('hidden');
        }

        const data = await get();

        setTodos(data);
      } catch (error) {
        if (error instanceof Error) {
          errorHandling(error);
        }
      }
    };

    fetchTodos();
  }, []);

  const handleClose = () => {
    if (notificationRef.current) {
      notificationRef.current.classList.add('hidden');
    }
  };

  const filteredTodos = (): TodoInterface[] => {
    return todos.filter(todo => {
      switch (fiter) {
        case 'all':
          return true;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
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
          <form>
            <input
              ref={inputForFocusRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && <TodoList filteredTodos={filteredTodos()} />}

        {todos.length > 0 && (
          <FilteredTodoList todos={todos} setFilter={setFilter} fiter={fiter} />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        ref={notificationRef}
        data-cy="ErrorNotification"
        className="notification 
        is-danger is-light has-text-weight-normal hidden"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleClose}
        />
        {errorMessage}
      </div>
    </div>
  );
};
