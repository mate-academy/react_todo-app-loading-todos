import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className={cn('todoapp__main', { hidden: todos.length === 0 })}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
