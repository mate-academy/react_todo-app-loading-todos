import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  visibleToDos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visibleToDos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleToDos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
