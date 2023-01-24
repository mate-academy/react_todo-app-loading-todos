/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';// import Authprovider+
import { Content } from './components/Auth/Content';
import { ErrorNotification } from './components/Auth/ErrorNotification';
import { Footer } from './components/Auth/Footer';
import { Header } from './components/Auth/Header';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('All');
  const [errorPush, setErrorPush] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    getTodos(user?.id || 0)
      .then(todo => setTodos(todo))
      .catch(() => {
        setErrorPush(true);
        setErrorMessage('Error request for todos failed');
      });
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const swithCase = (value: string) => {
    switch (value) {
      case 'Active':
        return todos.filter(todo => todo.completed === false);

      case 'Completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const preaperedTodo = swithCase(status);

  return (
    //  use Tag Authprovider
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length !== 0 && (
          <Content
            preaperedTodo={preaperedTodo}
          />
        )}
        <Footer
          onStatus={setStatus}
          status={status}
        />
      </div>

      <ErrorNotification
        errorPush={errorPush}
        errorMessage={errorMessage}
        setErrorPush={(state: boolean) => setErrorPush(state)}
      />
    </div>
  );
};
