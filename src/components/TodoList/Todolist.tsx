import React from 'react';
import { Todo } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
));
