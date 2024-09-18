import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todosFromServer: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosFromServer }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFromServer.map(todo => (
        <TodoItem key={todo.id} todoInfo={todo} />
      ))}
    </section>
  );
};
