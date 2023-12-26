import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  onCompletionChange: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = (
  { todos, onCompletionChange },
) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos
      .map(todo => (
        <TodoInfo
          todo={todo}
          onCompletionChange={onCompletionChange}

        />
      ))}
  </section>
);
