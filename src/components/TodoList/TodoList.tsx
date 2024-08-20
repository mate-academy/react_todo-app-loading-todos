import TodoCard from '../TodoCard/TodoCard';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[] | ((todos: Todo[]) => Todo[])) => void;
  setErrorMessage: (text: string) => void;
};

const TodoList: React.FC<Props> = ({ todos, setTodos, setErrorMessage }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoCard
          key={todo.id}
          todo={todo}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </section>
  );
};

export default TodoList;
