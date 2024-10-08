import { Todo as TodoComponent } from '../Todo/Todo';
import { Todo as TodoType } from '../../types/Todo';

type TodoListProps = {
  todos: TodoType[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
