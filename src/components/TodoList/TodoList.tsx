import { useTodoContext } from '../../context/TodosProvider';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard/TodoCard';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo: Todo) => {
        return <TodoCard todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
