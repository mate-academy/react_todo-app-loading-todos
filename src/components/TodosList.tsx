import React, { } from 'react';
import { List } from './List';
import { Todo } from '../types/Todo';

type Props = {
  setOfItems: Todo[],
};

export const TodosList: React.FC<Props> = ({ setOfItems }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {setOfItems.map(todo => (
        <List key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
