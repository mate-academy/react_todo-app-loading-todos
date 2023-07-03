/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorTypes } from './types/ErrorTypes';
import { ErrorMessage } from './components/ErrorMessage';

const USER_ID = 10905;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes>();

  const filterTodos = (filterTodosBy: string) => {
    switch (filterTodosBy) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

      case 'All':
      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((res) => {
        setTodos(res);
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage(ErrorTypes.LOAD);
        setTimeout(() => setIsError(false), 3000);
      });
  }, []);

  const visibleTodos = filterTodos(selectedFilter);
  const todosLeftToFinish = filterTodos('Active');

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button type="button" className="todoapp__toggle-all active" />

          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList visibleTodos={visibleTodos} />
            <Footer
              todosLeftToFinish={todosLeftToFinish}
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
            />
          </>
        )}
      </div>

      <ErrorMessage
        isError={isError}
        setIsError={setIsError}
        errorMessage={errorMessage}
      />
    </div>
  );
};
