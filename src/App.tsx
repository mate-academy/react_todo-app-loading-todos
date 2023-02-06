import React, { useEffect, useState } from 'react';

import { getTodos } from './api/todos';
import { Content } from './components/Content';
import { Errors } from './components/Errors';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 6192;

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => setAllTodos(result));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Content todos={allTodos} />

      <Errors />
    </div>
  );
};
