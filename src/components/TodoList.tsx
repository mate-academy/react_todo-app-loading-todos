import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  mainTodoList: Todo[];
  handleCompleted: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  mainTodoList,
  handleCompleted,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {mainTodoList &&
        mainTodoList.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCompleted={handleCompleted}
          />
        ))}
    </section>
  );
};
