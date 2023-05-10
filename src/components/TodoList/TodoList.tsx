import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  isLoading: boolean;
  isEdited: boolean;
}

export const TodoList: FC<Props> = ({ todos, isLoading, isEdited }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          isLoading={isLoading}
          isEdited={isEdited}
        />
      ))}
    </section>
  );
};
