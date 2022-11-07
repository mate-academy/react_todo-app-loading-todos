import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todo,
}) => {
  return (
    <section
      className="todoapp__main"
      data-cy="TodoList"
    >
      {todo.map(todoItem => (
        <TodoItem
          todo={todoItem}
          key={todoItem.id}
        />
      ))}
    </section>
  );
};
