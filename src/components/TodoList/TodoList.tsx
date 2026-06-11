import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  onUpdate: (todoToUpdate: Partial<Todo> & Pick<Todo, 'id'>) => Promise<void>;
  onDelete: (todoId: number) => Promise<void>;
}

export const TodoList: React.FC<Props> = ({ todos, onUpdate, onDelete }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {/* This is a completed todo */}
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </section>
);
