import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => (
        <TodoComponent todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
