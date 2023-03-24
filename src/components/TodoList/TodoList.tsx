import { FC } from 'react';
import type { Todo as TodoType } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: TodoType[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
