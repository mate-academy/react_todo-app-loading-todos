import React from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/status';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todosByStatus: (query?: Status) => Todo[];
  checkedUnchecked: (id: number) => void;
  queryStatus: Status;
}

export const TodoList: React.FC<TodoListProps> = ({
  queryStatus,
  todosByStatus,
  checkedUnchecked,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosByStatus(queryStatus)?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          checkedUnchecked={checkedUnchecked}
        />
      ))}
    </section>
  );
};
