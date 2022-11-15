import React, { useEffect, useRef, useState } from 'react';
import { TodoContent } from './components/TodoContent';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent
        newTodoField={newTodoField}
        setHasLoadingError={setHasLoadingError}
      />

      <ErrorNotification
        hasLoadingError={hasLoadingError}
        setHasLoadingError={setHasLoadingError}
      />
    </div>
  );
};
