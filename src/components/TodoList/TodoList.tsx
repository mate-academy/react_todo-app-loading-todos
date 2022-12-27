import React from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todoList: Todo[],
  setShowError: (val: Errors) => void
};

export const TodoList: React.FC<Props> = ({ todoList, setShowError }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            setShowError={setShowError}
          />
        </li>
      ))}
    </ul>
  );
};
