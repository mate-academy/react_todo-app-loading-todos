import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map((todo) => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
