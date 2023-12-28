import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  onCompletionChange: (todoId: number) => void,
  onRemoveTodo: (todoId: number) => void,
  onTodoEdited: (id: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = (
  {
    todos, onCompletionChange, onRemoveTodo, onTodoEdited,
  },
) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos
      .map(todo => (
        <TodoInfo
          todo={todo}
          onCompletionChange={onCompletionChange}
          onRemoveTodo={onRemoveTodo}
          onTodoEdited={onTodoEdited}
        />
      ))}
  </section>
);
