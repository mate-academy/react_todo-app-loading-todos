import { Todo } from '../types/Todo';
import { SingleTodo } from './SingleTodo';

type MainProps = {
  filteredTodos: Todo[];
  isLoadingTodoId: number | null;
  deleteTodo: (num: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const Main: React.FC<MainProps> = ({
  filteredTodos,
  isLoadingTodoId,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todoItem => (
        <SingleTodo
          todo={todoItem}
          key={todoItem.id}
          isLoadingTodoId={isLoadingTodoId}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
