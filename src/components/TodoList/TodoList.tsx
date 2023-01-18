import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: FC<Props> = memo(({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
});
