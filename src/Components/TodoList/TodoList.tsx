import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (todoId: number) => Promise<void>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSubmit={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </section>
  );
};
