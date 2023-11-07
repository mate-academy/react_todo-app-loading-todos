import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoappItem } from '../TodoappItem/TodoappItem';

type Props = {
  todos: Todo[],
};

export const TodoappList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoappItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
