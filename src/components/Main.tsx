import { Todo } from '../types/Todo';
import { TodoElement } from './Todo';

type Props = {
  todos: Todo[];
};

export const Main: React.FC<Props> = ({ todos }) => {
  // const handleDelete = (id: number) => {
  //   deleteTodo(id);
  // };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => {
        return <TodoElement todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
