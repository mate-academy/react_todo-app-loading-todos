import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodosList: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
    </section>
  );
};
