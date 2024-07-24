import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  displayedTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ displayedTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {displayedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
