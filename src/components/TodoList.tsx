/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../types/Todo';
import { TodoListItem } from './TodoListItem';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(({ id, title, completed }) => (
        <TodoListItem key={id} title={title} completed={completed} />
      ))}
    </section>
  );
};
