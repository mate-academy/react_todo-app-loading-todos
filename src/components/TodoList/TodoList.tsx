import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
