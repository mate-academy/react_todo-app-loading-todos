import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(({ id, title, completed }) => (
      <TodoInfo
        key={id}
        title={title}
        completed={completed}
      />
    ))}
  </section>
);
