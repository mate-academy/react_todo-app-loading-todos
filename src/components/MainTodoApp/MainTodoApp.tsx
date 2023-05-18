import React, { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';

interface Props {
  todos: Todo[];
}

export const MainTodoApp: FC<Props> = React.memo(({
  todos,
}) => (
  <section className="todoapp__main">
    {todos.map((todo) => (
      <TodoComponent
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
));
