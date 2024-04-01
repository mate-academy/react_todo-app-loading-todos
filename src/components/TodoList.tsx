import React from 'react';
import { TodoComp } from './TodoComp';
import { Todo } from '../types/Todo';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoComp key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
