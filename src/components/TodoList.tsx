import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[]
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
