import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { ErrorType } from '../../Enums/Enums';

type Props = {
  todos: Todo[];
  setError: (p: ErrorType) => void;
};

export const TodoList: React.FC<Props> = ({ todos, setError }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {
        todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} setError={setError} />
          </li>
        ))
      }
    </ul>
  );
};
