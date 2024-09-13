import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[] | null;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos &&
        todos.map((todo: Todo) => (
          <TodoItem
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            key={todo.id}
          />
        ))}
    </section>
  );
};
