import { Todo } from '../../types/Todo';
import TodoListItem from './TodoListItem';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => <TodoListItem todo={todo} />)}
    </section>
  );
};

export default TodoList;
