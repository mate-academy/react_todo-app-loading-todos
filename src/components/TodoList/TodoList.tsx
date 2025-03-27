import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[] | null | undefined;
}

export const TodoList: FC<Props> = ({ todos }: Props) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
  </section>
);
