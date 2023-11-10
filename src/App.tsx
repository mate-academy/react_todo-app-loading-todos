/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './components/UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';

const USER_ID = 11909;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filterTodos = (query: string) => {
    switch (query) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.All:
      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = filterTodos(filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          todos={visibleTodos}
        />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
