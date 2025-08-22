import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  isEditing: number | null;
  setIsEditing: (value: number | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  isEditing,
  setIsEditing,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ))}
    </section>
  );
};
