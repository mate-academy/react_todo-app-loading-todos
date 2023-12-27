/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './components/UserWarning';
import { TodoApp } from './components/TodoApp';
import { USER_ID } from './libs/constants';
import { StateProvider } from './components/StateProvider';

export const App: React.FC = () => {
  return (
    USER_ID ? (
      <StateProvider>
        <TodoApp />
      </StateProvider>
    ) : (
      <UserWarning />
    )
  );
};
