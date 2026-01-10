import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  deleteTodo: (postId: number) => void;
  handleCheckedId: (id: number) => void;
  visibleTodos: Todo[];
};

export const TodoList = ({
  visibleTodos,
  handleCheckedId,
  deleteTodo,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleCheckedId={handleCheckedId}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </section>
  );
};

export default TodoList;
