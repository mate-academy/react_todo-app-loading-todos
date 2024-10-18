import React from 'react';

import { Todo } from '../../types/Todo';
import { Todoitem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todoitem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
