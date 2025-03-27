import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  onTodoEdit: (editedTodo: Todo) => void;
  onTodoRemove: (idToRemove: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onTodoEdit,
  onTodoRemove,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onTodoEdit}
            onRemove={onTodoRemove}
          />
        );
      })}
    </section>
  );
};
