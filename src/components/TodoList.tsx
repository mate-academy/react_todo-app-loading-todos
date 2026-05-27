import { Todo } from '../types/Todo';
import React from 'react';
import { TodoItem } from './TodoItem';

type Props = {
  filteredTodos: Todo[];
  toggleTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, toggleTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </section>
  );
};
