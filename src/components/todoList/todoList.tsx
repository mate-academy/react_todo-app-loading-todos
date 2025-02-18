import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../todoItem/TodoItem';

type Props = {
  list: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

export const ToDoList: React.FC<Props> = ({ list, onToggle, onRemove }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {list.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};
