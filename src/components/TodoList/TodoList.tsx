import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  isLoading: boolean;
}

export const TodoList: FC<Props> = ({ todos, isLoading }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};
