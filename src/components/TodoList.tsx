import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
