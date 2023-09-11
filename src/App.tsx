import React from 'react';
import { UserWarning } from './UserWarning';
import { UserTodoList } from './components/TodoUserList';

const USER_ID = 11404;

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <UserTodoList userId={USER_ID} />
  );
};
