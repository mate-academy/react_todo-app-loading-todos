import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const Main: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos.map(({ title, completed, id }) => (
        <TodoItem title={title} completed={completed} key={id} id={id} />
      ))}
    </ul>
  );
};
