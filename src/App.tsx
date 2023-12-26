/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';

import { Todo } from './types/Todo';
import { Filter } from './types/FiltereBy';

import { getTodos } from './api/todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodosList } from './components/TodoList';

const USER_ID = 11712;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [errrMessage, setErrorMessage] = useState('');
  const addTodo = (currentTodo: Todo) => {
    setTodos([...todos, currentTodo]);
  };

  const filterTodos = () => {
    switch (filterBy) {
      case Filter.Active:
        return todos.filter((todo) => todo.completed === false);

      case Filter.Completed:
        return todos.filter((todo) => todo.completed === true);

      case Filter.All:
        return todos;

      default:
        return todos;
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} addTodo={addTodo} />

        <TodosList todos={filterTodos()} />

        {todos.length > 0 && (
          <Footer todos={todos} filterBy={filterBy} setFilterBy={setFilterBy} />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errrMessage },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errrMessage}
      </div>
    </div>
  );
};
