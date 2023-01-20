import { FC } from 'react';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { SetError } from '../../types/SetError';

type Props = {
  setError: SetError;
};

export const TodoContent: FC<Props> = ({ setError }) => {
  return (
    <div className="todoapp__content">
      <TodoHeader />

      <TodoList setError={setError} />
    </div>
  );
};
