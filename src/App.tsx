import React, { useContext } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoContent } from './components/Todo/TodoContent';
import { Error } from './components/Error/Error';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent />

      <Error />
    </div>
  );
};
