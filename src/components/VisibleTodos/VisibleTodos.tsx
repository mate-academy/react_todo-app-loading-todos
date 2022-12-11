import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';

interface Props {
  visibleTodos: Todo[] | null,
}

export const VisibleTodos: React.FC<Props> = (props) => {
  const { visibleTodos } = props;

  return (
    <>
      {visibleTodos?.map((todo: Todo) => (
        <section className="todoapp__main" data-cy="TodoList">
          <TodoComponent todo={todo} />
        </section>
      ))}
    </>
  );
};
