/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Todo } from '../../../types/Todo';
import { Todo as TodoItem } from '../Todo/Todo';

type Props = {
  todos: Todo[],
};

export const TodoAppBody: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo: Todo) => {
        const { title, id, completed } = todo;

        return (
          <TodoItem
            title={title}
            id={id}
            completed={completed}
          />
        );
      })}
    </section>
  );
};
