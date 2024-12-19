import React from 'react';
import { Todo } from '../types/Todo';
import { TodoElem } from './TodoElem';

interface Props {
  todos: Todo[];
  onUpdate: (v: Todo) => void;
  onDelete: (n: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoElem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
