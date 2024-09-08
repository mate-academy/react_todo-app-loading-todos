import React, { memo, useCallback, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

type Props = {
  todos: Todo[];
  onTodosChange: (newTodos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = memo(function TodoList({
  todos,
  onTodosChange,
}) {
  const [editedTodoId] = useState<number | null>(null);
  const [loadingTodosIds] = useState<number[]>([]);

  const checkHandle = useCallback(
    (toggledTodo: Todo) => {
      const index = todos.findIndex(todo => todo.id === toggledTodo.id);

      const newTodos = [...todos];

      newTodos.splice(index, 1, toggledTodo);

      onTodosChange(newTodos);
    },
    [todos, onTodosChange],
  );

  return (
    <section className="TodoList" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onToggle={checkHandle}
          isTodoEdited={editedTodoId === todo.id}
          isTodoLoading={loadingTodosIds.includes(todo.id)}
          key={todo.id}
        />
      ))}
    </section>
  );
});
