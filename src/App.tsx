/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterBy } from './types/FilterBy';

const USER_ID = 11844;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const todosCounter = todos.length - todos
    .reduce((acc, todo) => acc + +todo.completed, 0);

  const filteredTodos = (selectedTodos: Todo[], filter: FilterBy) => {
    switch (filter) {
      case FilterBy.Active:
        return selectedTodos.filter(todo => !todo.completed);
      case FilterBy.Complited:
        return selectedTodos.filter(todo => todo.completed);
      default:
        return selectedTodos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todosList) => setTodos(filteredTodos(todosList, filterBy)))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, [filterBy]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />
        <TodoList todos={todos} />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todosCounter={todosCounter}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}

      </div>

      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className={
            cn(
              'notification', 'is-danger', 'is-light', 'has-text-weight-normal',
              { hidden: !errorMessage },
            )
          }
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => setErrorMessage('')}
          />
          {/* show only one message at a time */}
          Unable to load todos
          {/* <br />
          Title should not be empty
          <br />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo */}
        </div>
      )}
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

    </div>
  );
};
