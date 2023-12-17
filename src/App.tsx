import React from 'react';
import { UserWarning } from './UserWarning';
import { AuthContext } from './Context/Context';
import { TodoAppContent } from './components/TodoAppContent';

const USER_ID = 12040;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <AuthContext.Provider value={USER_ID}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <TodoAppContent />
      </div>
    </AuthContext.Provider>
  );
};
