import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface P {
  todos: Todo[];
}

export const TodoList: React.FC<P> = ({ todos }) => (
  <section className="todoapp__main">
    {todos.map(todo => <TodoInfo todo={todo} key={todo.id} />)}
  </section>
);
