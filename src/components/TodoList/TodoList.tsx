import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[] | null;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos && todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
