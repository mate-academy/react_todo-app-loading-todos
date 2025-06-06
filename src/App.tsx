/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoappContent } from './components/TodoappContent';

export const App: React.FC = () => {
  const [errorNotification, setErrorNotification] = useState('');

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoappContent setErrorNotification={setErrorNotification} />

      {errorNotification && (
        <ErrorNotification
          errorNotification={errorNotification}
          setErrorNotification={setErrorNotification}
        />
      )}
    </div>
  );
};
