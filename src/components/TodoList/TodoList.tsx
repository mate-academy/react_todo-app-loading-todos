import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section
    className="todoapp__main"
    data-cy="TodoList"
  >
    {todos.map(todo => <TodoItem key={todo.id} todoItem={todo} />)}
  </section>
);
