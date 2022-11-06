import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(({ id, title, completed }) => (
        <TodoItem
          key={id}
          title={title}
          isCompleted={completed}
        />
      ))}
    </section>
  );
};
