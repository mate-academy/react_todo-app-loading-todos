import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, onDeleteTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} onDeleteTodo={onDeleteTodo} />
      ))}
    </section>
  );
};

export default TodoList;
