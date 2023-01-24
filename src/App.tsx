/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Todolist } from './components/Todolist';
import { Footer } from './components/Footer';
import { Errornotification } from './components/Errornotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterTypeTodos, setFilterTypeTodos] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const handleClickChangeFilterTypeTodos = (status: string) => {
    setFilterTypeTodos(status);
  };

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterTypeTodos) {
        case 'all':
          return todo;

        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        default:
          break;
      }

      return null;
    });
  }, [todos, filterTypeTodos]);

  const closeErrorMessage = () => {
    setErrorMessage('');
  };

  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 3000);
  }

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setErrorMessage('Unable to add a todo'));
    }
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0

        && (
          <>
            <Todolist todos={visibleTodos} />
            <Footer
              todos={visibleTodos}
              methodToFilter={handleClickChangeFilterTypeTodos}
              filterTypeTodos={filterTypeTodos}
            />
          </>
        )}
      </div>

      {errorMessage
        && (
          <Errornotification
            errorMessage={errorMessage}
            closeErrorMessage={closeErrorMessage}
          />
        )}
    </div>
  );
};
