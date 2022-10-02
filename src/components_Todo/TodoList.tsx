import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

interface Props {
  todos: Todo[] | null;
  statusPatch: string;
  setStatusPatch: (event: string) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  statusPatch,
  setStatusPatch,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos && (todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          statusPatch={statusPatch}
          setStatusPatch={setStatusPatch}
        />
      )))}
    </section>

  );
};
