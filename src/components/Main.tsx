import { Todo } from '../types/Todo';
import { SingleTodo } from './SingleTodo';

type MainProps = {
  filteredTodos: Todo[];
  deleteTodo: (num: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const Main: React.FC<MainProps> = ({
  filteredTodos,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todoItem => (
        <SingleTodo
          key={todoItem.id}
          todo={todoItem}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
