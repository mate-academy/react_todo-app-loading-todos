import React from 'react';
import { Todo } from '../types/Todo.js';
import { TodoUser } from '../Components/TodoUser';

interface Props {
  tasks: Todo[];
}

export const TodoList: React.FC<Props> = ({ tasks }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {tasks.map(task => (
        <TodoUser task={task} key={task.id} />
      ))}
    </section>
  );
};
