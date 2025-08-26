import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  disableActions?: boolean;
  onToggle?: (t: Todo) => void;
  onDelete?: (t: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  disableActions = true,
  onToggle,
  onDelete,
}) => {
  return (
    <section className="todoapp__main">
      <ul className="todo-list" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            disableActions={disableActions}
            loading={false}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
};
