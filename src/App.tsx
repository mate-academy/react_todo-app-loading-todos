import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import classNames from 'classnames';
export const LOCAL_ID = 1000000000000;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('All');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [tempId, setTempId] = useState<number[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (todos.length === 0) {
      setIsEmpty(true);      
    } else {
      setIsEmpty(false);
    }
  }, [todos])

  if (!USER_ID) {
    return <UserWarning />;
  }

  if (errorMessage.trim()) {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={filteredTodos}
          isEmpty={isEmpty}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          setIsAdd={setIsAdd}
          setIsChange={setIsChange}
          setChangedId={setTempId}
        />
        {todos && (
          <TodoList
            todos={filteredTodos}
            isAdd={isAdd}
            isDelete={isDelete}
            isChange={isChange}
            tempId={tempId}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
          />
        )}

        {todos.length !== 0 && (
          <Footer
            todos={filteredTodos}
            filter={filter}
            setTodos={setTodos}
            setIsDelete={setIsDelete}
            setDeletedId={setTempId}
            setFilter={setFilter}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          { hidden: !errorMessage.trim() },
          'notification is-danger is-light has-text-weight-normal',
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
        <br />
      </div>
    </div>
  );
};
