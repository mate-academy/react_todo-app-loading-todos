import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = memo(({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </section>
  );
});
