import React from 'react';
import { Todo } from '../../types/Todo';
import { Task } from '../Task/Task';

type Props = {
  todos: Todo[]
};

const TodoMain: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((task) => (
        <Task key={task.id} todo={task} />
      ))}

    </section>
  );
});

export { TodoMain };
