/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { USER_ID } from './utils/fetchClient';
import { Status } from './types/Status';
import { ErrorNotification } from './components/ErrorNotification';
import { Message } from './types/Message';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosStatus, setTodosStatus] = useState<Status>(Status.All);
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Message | ''>('');

  const filterTodos = (listTodos: Todo[], status: Status) => {
    switch (status) {
      case Status.Active:
        return listTodos.filter(todo => !todo.completed);
      case Status.Completed:
        return listTodos.filter(todo => todo.completed);
      case Status.All:
      default:
        return listTodos;
    }
  };

  const visivleTodo = filterTodos(todos, todosStatus);
  const activeTodos = todos.filter(todo => !todo.completed);

  useEffect(() => {
    setTimeout(() => {
      getTodos(USER_ID)
        .then(setTodos)
        .catch(() => setErrorMessage(Message.NoLoadTotos));
    }, 3000);

    setErrorMessage('');
  }, [USER_ID]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <TodoList todos={visivleTodo} />
        )}
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todosStatus={todosStatus}
            setTodosStatus={setTodosStatus}
            activeTodos={activeTodos}
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
