import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </>
);
