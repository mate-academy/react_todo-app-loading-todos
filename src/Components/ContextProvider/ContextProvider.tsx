import {
  FC,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { getTodos } from '../../api/todos';
import { Context } from '../../Context';

import { Todo } from '../../types/Todo';
import { ErrorMessage } from '../../types/ErrorMessage';

interface Props {
  children: ReactNode;
}

export const USER_ID = 12176;

export const ContextProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    errorMessage,
    setErrorMessage,
  ] = useState<ErrorMessage>(ErrorMessage.NULL);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.UNABLE_TO_LOAD));
  }, [todos]);

  const handleErrorChange = (value: ErrorMessage) => {
    setErrorMessage(value);
  };

  const handleStatusEdit = () => {
    handleErrorChange(ErrorMessage.UNABLE_TO_UPDATE);
  };

  return (
    <Context.Provider value={{
      todos,
      errorMessage,
      handleErrorChange,
      handleStatusEdit,
    }}
    >
      {children}
    </Context.Provider>
  );
};
