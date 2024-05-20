import { Todo } from '../types/Todo';

import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onDelete?: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onDelete = () => {} }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} onDelete={onDelete} />
      ))}
    </section>
  );
};
