import React from 'react';
import { TodoCard } from './TodoCard';
import { Todo } from './types/Todo';

type Props = {
  visibleTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
}) => (
  <section className="todoapp__main">
    {visibleTodos.map(todo => (
      <TodoCard
        currentTodo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
