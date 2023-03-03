import { FC } from 'react';

import { TodoComponent } from './TodoComponent';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filterCallback: (todo: Todo) => boolean,
};

export const ListOfTodos: FC<Props> = ({
  todos,
  filterCallback,
}) => (
  <section
    className="todoapp__main"
  >
    {todos.filter(filterCallback)
      .map(({ id, title, completed }: Todo) => (
        <TodoComponent
          id={id}
          completed={completed}
          title={title}
        />
      ))}
  </section>
);
