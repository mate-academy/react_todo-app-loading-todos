import { FC } from 'react';
import { Todo } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const ToodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
