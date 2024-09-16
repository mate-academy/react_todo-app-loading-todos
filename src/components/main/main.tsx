import React from 'react';
import { Todo } from '../../types/Todo';
import { Todo as OneTodo } from '../../todo';

type Props = {
  todos: Todo[];
};

export const Main: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => {
        return <OneTodo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
