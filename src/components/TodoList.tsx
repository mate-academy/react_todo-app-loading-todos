import { Todo } from '../types/Todo';
import { TodoElement } from './Todo';

type Props = {
  todos: Todo[];
  onTodoDelete: (todoId: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onTodoDelete }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoElement key={todo.id} todo={todo} onTodoDelete={onTodoDelete} />
        );
      })}
    </section>
  );
};
