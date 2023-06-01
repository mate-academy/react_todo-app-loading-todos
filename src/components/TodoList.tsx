import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todosAfterFilter: Todo[],
};

export const TodoList: React.FC<Props> = ({ todosAfterFilter }) => {
  return (
    <section className="todoapp__main">
      {
        todosAfterFilter.map(todo => (<TodoItem todo={todo} key={todo.id} />))
      }
    </section>
  );
};
