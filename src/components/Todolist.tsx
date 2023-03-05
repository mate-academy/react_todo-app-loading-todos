/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  setHasCompleted: React.Dispatch<boolean>;
};

export const Todolist: React.FC<Props> = ({
  todos,
  setHasCompleted,
}) => {
  return (
    <section className="todoapp__main">
      {todos
        .map(todo => {
          if (todo.completed) {
            setHasCompleted(true);
          }

          return (
            <TodoInfo
              todo={todo}
              key={todo.id}
            />
          );
        })}
    </section>
  );
};
