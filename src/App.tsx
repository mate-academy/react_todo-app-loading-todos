import React, { useState } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID } from './utils/todos';

import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList/TodoList';

import { ErrorNotification } from './components/ErrorNotification';

import { useTodos } from './components/context/TodosContext';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';

export const App: React.FC = () => {
  const [isLoading] = useState(false);

  const { todos } = useTodos();

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        {isLoading ? <Loader /> : <TodoList />}
        {todos.length > 0 && <TodoFooter />}
      </div>

      <ErrorNotification />
    </div>
  );
};
