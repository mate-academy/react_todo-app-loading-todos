/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import {
  getTodos,
} from './api/todos';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [errorType, setErrorType] = useState('');

  const userId = user?.id;

  useEffect(() => {
    getTodos(userId || 0)
      .then(setTodos);
  }, []);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          userId={userId || 0}
          setTodos={setTodos}
          todos={todos}
          setErrorType={setErrorType}
        />

        <TodoList
          todos={todos}
          setTodos={setTodos}
          filterType={filterType}
          setErrorType={setErrorType}
        />

        <Footer
          todos={todos}
          setTodos={setTodos}
          setFilterType={setFilterType}
          filterType={filterType}
        />
      </div>

      <ErrorMessage
        errorType={errorType}
        setErrorType={setErrorType}
      />
    </div>
  );
};
