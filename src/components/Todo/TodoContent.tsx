import { FC } from 'react';
import { ErrorMsg } from '../../types/ErrorMsg';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';

type Props = {
  setError: (err: boolean, msg: ErrorMsg) => void;
};

export const TodoContent: FC<Props> = ({ setError }) => {
  return (
    <div className="todoapp__content">
      <TodoHeader />

      <TodoList setError={setError} />
    </div>
  );
};
