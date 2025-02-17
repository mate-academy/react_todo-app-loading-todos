import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  changindIds: number[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos, changindIds }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            isProcessed={changindIds.includes(todo.id)}
            onUpdate={() => {}}
            key={todo.id}
          />
        ))}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
