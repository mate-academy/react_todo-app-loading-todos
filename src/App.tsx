/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/privateID';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './Components/TodoForm/TodoForm';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';
import { ErrorNotification }
  from './Components/ErrorNotification/ErrorNotification';
import { FilterType } from './utils/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    todoService.getTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch(() => setErrorMessage('Unable to load a todo'));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      case FilterType.All:
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm todos={visibleTodos} />
        {visibleTodos.length !== 0 && <TodoList todos={visibleTodos} />}

        {/* Hide the footer if there are no todos */}
        {visibleTodos.length !== 0
          && (
            <Footer
              setFilterType={setFilterType}
              filterType={filterType}
              todos={todos}
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
