import { useState } from 'react';
import { TodoContent } from './components/Todo/TodoContent';
import { Error } from './components/Error/Error';
import { ErrorMsg } from './types/ErrorMsg';

export const App = () => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>(ErrorMsg.NoError);

  const setError = (error: boolean, msg = ErrorMsg.NoError) => {
    setErrorMsg(msg);
    setIsError(error);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoContent setError={setError} />

      <Error
        error={isError}
        errorMsg={(errorMsg)}
      />
    </div>
  );
};
