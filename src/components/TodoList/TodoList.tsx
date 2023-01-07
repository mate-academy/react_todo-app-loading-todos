import { Todo } from '../../types/Todo';
import TodoComponent from '../Todo/Todo';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => <TodoComponent todo={todo} />)}
    </section>
  );
};

export default TodoList;
