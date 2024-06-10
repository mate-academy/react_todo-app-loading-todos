/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import cn from 'classnames';
import { ErrorTypes } from './types/ErrorTypes';

export const App: React.FC = () => {
  const [listOfTodos, setListOfTodos] = useState<Todo[]>([]);
  const [selectedValue, setSelectedValue] = useState('All');
  const [errorMessage, setErrorMessage] = useState<ErrorTypes | null>(null);

  useEffect(() => {
    todoService
      .getTodos()
      .then(setListOfTodos)
      .catch(() => {
        setErrorMessage(ErrorTypes.UnableToLoad);
      });
  }, []);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  const getFilteringTodos = listOfTodos.filter(todo => {
    switch (selectedValue) {
      case 'All':
        return true;
      case 'Active':
        return todo.completed === false;
      case 'Completed':
        return todo.completed === true;
      default:
        return true;
    }
  });

  const handleCompleted = (n: number) => {
    const updatedTodos = listOfTodos?.map(todo =>
      todo.id === n ? { ...todo, completed: !todo.completed } : todo,
    );

    setListOfTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList
          mainTodoList={getFilteringTodos}
          handleCompleted={handleCompleted}
        />

        {listOfTodos && (
          <Footer
            todos={getFilteringTodos}
            setSelectedFilter={setSelectedValue}
            selectedValue={selectedValue}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};
