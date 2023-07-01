import { FC, memo } from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';

type Props = {
  todos: TodoType[];
};

export const TodoList: FC<Props> = memo(({ todos }) => {
  return (
    <ul className="todoapp__main">
      {todos?.map(todo => <Todo key={todo.id} todo={todo} />)}
    </ul>
  );
});
