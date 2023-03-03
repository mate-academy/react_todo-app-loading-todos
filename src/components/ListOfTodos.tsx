import { FC } from 'react';

import { TodoComponent } from './TodoComponent';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
};

export const ListOfTodos: FC<Props> = ({
  todos,
}) => (
  <section
    className="todoapp__main"
  >
    {todos.map(({ id, title, completed }: Todo) => (
      <TodoComponent
        key={id}
        completed={completed}
        title={title}
      />
    ))}
  </section>
);
