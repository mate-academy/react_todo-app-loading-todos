import { Todo as TodoType } from '../../types/Todo';
import { Todo } from '../Todo/Todo';

interface Props {
  todos: TodoType[],
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
