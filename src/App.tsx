/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './Components/TodoList';
import { ErrorNotification } from './Components/ErrorNotification';
import { Footer } from './Components/Footer';
import { Status, Todoo } from './types/Todo';
import { Error } from './types/Todo';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todoo[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<Error | null>(null);
  const [filter, setFilter] = useState<Status>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (err) {
        setError(true);
        setErrorType('load');
      }
    };
    fetchTodos();
  }, []);

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleToggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  const hideError = () => {
    setError(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newTodoTitle = event.currentTarget.value.trim();
      if (newTodoTitle) {
        const newTodo: Todoo = {
          id: todos.length + 1,
          userId: USER_ID,
          title: newTodoTitle,
          completed: false,
        };
        setTodos(prevTodos => [...prevTodos, newTodo]);
      } else {
        setError(true);
        setErrorType('empty');
      }
    }
  };

  const onClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const handleFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      {!USER_ID && <UserWarning />}
      <h1 className="todoapp__title">todos</h1>
      {USER_ID && (
        <div className="todoapp__content">
          <header className="todoapp__header">
            {/* this button should have `active` class only if all todos are completed */}
            <button
              type="button"
              className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAllTodos}
            />

            {/* Add a todo on form submit */}
            <form>
              <input
                data-cy="NewTodoField"
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                onKeyDown={handleKeyDown}
              />
            </form>
          </header>

          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
            filter={filter}
          />

          {/* Hide the footer if there are no todos */}
          {todos.length > 0 && (
            <Footer
              filter={filter}
              todosCount={todos.length}
              completedTodosCount={todos.filter(todo => todo.completed).length}
              onClearCompleted={onClearCompleted}
              handleFilterChange={handleFilterChange}
            />
          )}
        </div>
      )}
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        error={error}
        errorType={errorType}
        hideError={hideError}
      />
    </div>
  );
};
