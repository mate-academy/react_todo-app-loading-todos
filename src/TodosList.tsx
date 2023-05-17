import React from 'react';
import { TodoComponent } from './TodoComponent';
import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

export const TodosList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoComponent
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
