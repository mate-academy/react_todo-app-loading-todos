import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShowError } from './components/ShowError';
import { ShowTodos } from './components/ShowTodos';

const USER_ID = 11093;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hiddenError, setHiddenError] = useState(true);
  const [activeTab, setAvtiveTab] = useState('All');

  useEffect(() => {
    getTodos(USER_ID)
      .then(res => setTodos(res))
      .catch(() => setHiddenError(false));
  }, []);

  useEffect(() => {
    setTimeout(() => setHiddenError(true), 3000);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <ShowTodos todos={todos} activeTab={activeTab} />

        <Footer
          todos={todos}
          setAvtiveTab={setAvtiveTab}
          avtiveTab={activeTab}
        />
      </div>

      <ShowError hiddenError={hiddenError} setHiddenError={setHiddenError} />
    </div>
  );
};
