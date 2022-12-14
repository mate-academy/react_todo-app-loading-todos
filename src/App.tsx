import React from 'react';
import { AuthProvider } from './components/Auth/AuthContext';
import { Todos } from './components/Todos';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <AuthProvider>
        <Todos />
      </AuthProvider>
    </div>
  );
};
