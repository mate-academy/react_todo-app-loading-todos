import React from 'react';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
