/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { useState } from 'react';
import { useEffect } from 'react';
import { Todo } from './types/Todo';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

const USER_ID = 10775;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilterBy] = useState('All')
  const [isError, setIsError] = useState<string | null>(null);

  if (!USER_ID) {
    return <UserWarning />;
  }

  useEffect(() => {
    getTodos(USER_ID)
      .then((loadedTodos: Todo[]) => {
        setTodos(loadedTodos);
      })
      .catch((loadedError: Error) => {
        setIsError(loadedError?.message ?? 'Error');
      });
  }, []);


  const getFilteredTodos = () => {
    return todos.filter(todo => {
      switch (filteredBy) {
        case 'Completed':
          return todo.completed ? todo : 0;
        case 'Active':
          return todo.completed ? 0 : todo;

        case 'All':
          return todo;

        default:
          return 0;
      }
    })
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {(todos.length > 0) && (
            <button type="button" className="todoapp__toggle-all active" />
          )}

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <TodoList todos={getFilteredTodos()} />
        )}

        {(todos.length > 0) && (
          <Footer
            todos={todos}
            filteredBy={filteredBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {isError && (<Notification />)}
    </div>
  );
};
