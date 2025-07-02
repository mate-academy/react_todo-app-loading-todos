/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { TodoList } from './Components/TodoList';
import { Notifications } from './Components/Notifications';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(timer);
    }

    return;
  }, [errorMessage]);

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'active') {
      return !todo.completed;
    }

    if (filterStatus === 'completed') {
      return todo.completed;
    }

    return true; // 'all'
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} title={title} setTitle={setTitle} />

        {todos.length > 0 && <TodoList filteredTodos={filteredTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
          />
        )}
      </div>

      <Notifications
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
