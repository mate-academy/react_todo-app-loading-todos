import React from 'react';
import { TodoCard } from '../commponents/TodoCard';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
