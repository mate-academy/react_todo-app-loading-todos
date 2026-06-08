import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul>
        {todos.map(todo => (
          <TodoInfo key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
    </section>
  );
};
