import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </div>
  );
};
