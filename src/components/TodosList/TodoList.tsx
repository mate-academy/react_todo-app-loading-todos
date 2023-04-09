import React from 'react';
import { TodoListItem } from '../TodoListItem';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="todoapp__main">
    {todos?.map(todo => (
      <TodoListItem todo={todo} />
    ))}
  </section>
);
