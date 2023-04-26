import { FC } from 'react';
import { TodoTask } from '../TodoTask';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  isLoading: boolean;
  isEdited: boolean
};

export const TodoList: FC<Props> = ({ filteredTodos, isLoading, isEdited }) => {
  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => (
        <TodoTask
          key={todo.id}
          todo={todo}
          isLoading={isLoading}
          isEdited={isEdited}
        />
      ))}
    </section>
  );
};
