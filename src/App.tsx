import React, { useEffect, useState, useRef } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { Footer as TodoFooter } from './components/Footer';
import { Filter } from './types/Filter';
import { errorMessages, ErrorMessages } from './types/ErrorMessages';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError(errorMessages.load))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let timerId = 0;

    if (error) {
      timerId = window.setTimeout(() => setError(null), 3000);
    }

    return () => clearTimeout(timerId);
  }, [error]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const newTodoTitle = event.currentTarget.value.trim();

      if (!newTodoTitle) {
        setError(errorMessages.title);

        return;
      }

      const newTodo: Todo = {
        id: Date.now(),
        title: newTodoTitle,
        completed: false,
        userId: USER_ID,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleHideError = () => {
    setError(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.active) {
      return !todo.completed;
    }

    if (filter === Filter.completed) {
      return todo.completed;
    }

    return true;
  });

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', { active: allTodosCompleted })}
            data-cy="ToggleAllButton"
            onClick={() => {
              const completedStatus = !allTodosCompleted;

              setTodos(prevTodos =>
                prevTodos.map(todo => ({
                  ...todo,
                  completed: completedStatus,
                })),
              );
            }}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onKeyDown={handleAddTodo}
              ref={inputRef}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {isLoading ? (
            <div data-cy="TodoLoader" className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                data-cy="Todo"
                className={cn('todo', { completed: todo.completed })}
                key={todo.id}
              >
                <label
                  className="todo__status-label"
                  htmlFor={`todo-checkbox-${todo.id}`}
                >
                  Toggle completed
                  <input
                    id={`todo-checkbox-${todo.id}`}
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                    onChange={() =>
                      setTodos(prevTodos =>
                        prevTodos.map(item =>
                          item.id === todo.id
                            ? { ...item, completed: !item.completed }
                            : item,
                        ),
                      )
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
                  onClick={() =>
                    setTodos(prevTodos =>
                      prevTodos.filter(item => item.id !== todo.id),
                    )
                  }
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))
          )}
        </section>

        {todos.length > 0 && (
          <TodoFooter
            setFilter={setFilter}
            remainingCount={todos.filter(todo => !todo.completed).length} // Змінено тут
            currentFilter={filter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleHideError}
        />
        {error}
      </div>
    </div>
  );
};
