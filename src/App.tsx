/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterEnum } from './types/FilterEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterEnum>(FilterEnum.All);

  const inputField = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    setError(null);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');

        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputValue = inputField.current?.value.trim();

    if (!inputValue) {
      setError('Title should not be empty');
      setTimeout(() => {
        setError('');
      }, 3000);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: inputValue,
      userId: USER_ID,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    if (inputField.current) {
      inputField.current.value = '';
    }
  };

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterEnum.Active:
        return !todo.completed;
      case FilterEnum.Completed:
        return todo.completed;
      case FilterEnum.All:
      default:
        return true;
    }
  });

  const updateTodoStatus = (todoId: number, completed: boolean) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed } : todo,
      ),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.length > 0 && todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={inputField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleInputChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={cn('todo', {
                completed: todo.completed,
              })}
            >
              <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
                <input
                  id={`todo-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={event =>
                    updateTodoStatus(todo.id, event.target.checked)
                  }
                />
              </label>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
              >
                ×
              </button>

              <div data-cy="TodoLoader" className="modal overlay">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          ))}
        </section>
        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {Object.values(FilterEnum).map(status => (
                <a
                  key={status}
                  href={`#/${status}`}
                  className={cn('filter__link', {
                    selected: status === filterStatus,
                  })}
                  data-cy={`FilterLinkAll${status}`}
                  onClick={() => setFilterStatus(status as FilterEnum)}
                >
                  {status}
                </a>
              ))}
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            >
              Clear completed
            </button>
          </footer>
        )}

        {/* DON'T use conditional rendering to hide the notification */}
        {/* Add the 'hidden' class to hide the message smoothly */}
        <div
          data-cy="ErrorNotification"
          className={cn(
            'notification is-danger is-light has-text-weight-normal',
            { hidden: !error },
          )}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setError(null)}
          />
          {error}
        </div>
      </div>
    </div>
  );
};
