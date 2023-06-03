/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { Notification } from './components/Notification';

const USER_ID = 10620;

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('');

  const getFiltredTodos = (value: string) => {
    switch (value) {
      case 'completed':
        return initialTodos.filter(t => t.completed);

      case 'active':
        return initialTodos.filter(t => !t.completed);

      default:
        return initialTodos;
    }
  };

  const todos = getFiltredTodos(filter);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setInitialTodos)
      .catch(() => setErrorMessage('Unable to load todos'));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoList todos={todos} />
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </div>
      <Notification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
