import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
});
