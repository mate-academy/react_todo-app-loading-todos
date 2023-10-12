/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo, ErrorMessage, Filter } from './types/Todo';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const counter = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const visibleTodos = () => {
    const visible = [...todos].filter(todo => {
      if (filter === 'Active' && todo.completed) {
        return false;
      }

      if (filter === 'Completed' && !todo.completed) {
        return false;
      }

      return true;
    });

    return visible;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!title.trim()) {
      setErrorMessage(ErrorMessage.noTitle);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((todo) => {
        setTodos(todo);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.noTodos);
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
        <Header
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          todos={todos}
        />
        {todos.length > 0 && <List todos={visibleTodos()} />}
        {todos.length > 0 && (
          <Footer
            counter={counter()}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          !errorMessage && 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {/* show only one message at a time */}
        {errorMessage}
        <br />
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
